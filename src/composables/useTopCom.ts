import {
  defineAsyncComponent,
  getCurrentInstance,
  h,
  ref,
  shallowRef,
} from "vue";
import type { TopComPlugin, TopComConfig, TopComOptions } from "..";
import mapObject from "map-obj";
import { defaultCompiler } from "../compilers/default";

export const useTopCom = (options: TopComOptions = {}) => {
  const app = getCurrentInstance()!;
  const components = shallowRef<Record<string, any>>({});
  const plugins = shallowRef<TopComPlugin[]>(options.plugins ?? []);

  const register = (config: TopComConfig) => {
    const Com = defineAsyncComponent({
      loader: async () => {
        for (let plugin of plugins.value) {
          await plugin.initConfig?.(config);
        }
        if (config.data && typeof config.data !== "function") {
          const rawData = mapObject(config.data, (k, v) => [String(k), v], {
            deep: true,
          });
          config.data = () => rawData;
        }
        return {
          setup(props, ctx) {
            const rawStates = config.setup?.(props, ctx) ?? {};
            const state = ref(config.state ?? {});
            Object.assign(state.value, rawStates);
            if (typeof config.data === "function") {
              Object.assign(state.value, config.data?.());
            }
            for (let plugin of plugins.value) {
              plugin.initState?.(config, state.value);
            }
            config.log && console.log(config.name, "setup");
            return state.value;
          },
          render(...args) {
            config.log && console.log(config.name, "render");
            if (typeof config.render === "function") {
              return h(config.render.bind(this)(...args));
            }
            try {
              const vnode = (options.compiler ?? defaultCompiler).compile(
                config
              );
              return h(vnode(...args));
            } catch (e: any) {
              return h("span", `Template compile error: ${e}`);
            }
          },
          ...config,
        };
      },
      ...(options.asyncComponentOptions ?? {})
    });
    Com.name = config.name;
    if (config.global) {
      app.appContext.components[config.name] = Com;
    }
    components.value[config.name] = Com;
    return Com;
  };

  return {
    register,
    components,
    plugins,
  };
};
