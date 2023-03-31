import { shallowRef, ref, watch, computed } from "vue";
import type { TopComConfig } from "..";

export interface ApiConfig<TConfig = any> {
  name?: string;
  default?: any;
  config?: TConfig | ((data: any) => TConfig);
  shallow?: boolean;
  immediate?: boolean;
}

declare module ".." {
  interface TopComConfig {
    apis?: Record<string, any>;
  }
}

export interface UseAsyncStateOptions {
  immediate?: boolean;
  shallow?: boolean;
}

export const useAsyncState = (
  exec: (...args) => any,
  defaults?,
  options: UseAsyncStateOptions = {}
) => {
  options = Object.assign({ shallow: false, immediate: true }, options);
  const state = options.shallow ? shallowRef(defaults) : ref(defaults);
  const isLoading = ref(false);
  const isReady = ref(false);
  const error = ref();
  const execute = async (...args) => {
    isLoading.value = true;
    try {
      state.value = await exec(...args);
    } catch (e) {
      error.value = e;
    }
    isLoading.value = false;
  };
  if (options.immediate) {
    execute();
  }
  return {
    state,
    isLoading,
    isReady,
    execute,
  };
};

export interface ApiPluginOptions<TConfig = any, TData = any> {
  loader: (config: TConfig) => Promise<TData>;
}

/**
 * APIs support
 *
 * Recommend to install `axios` and `@vueuse/core`
 *
 * @param options
 * @returns
 */
export const apiPlugin = <TConfig = any, TData = any>(
  options: ApiPluginOptions<TConfig, TData>
) => {
  return {
    initState(config: TopComConfig, state: any) {
      watch(
        () => config.apis,
        (apis) => {
          for (let key in apis) {
            const api = apis[key];

            state[key] = useAsyncState(
              () => {
                const requestConfig = computed(() => {
                  return typeof api.config === "function"
                    ? api.config?.(state)
                    : api.config!;
                });
                return options.loader(requestConfig.value as any);
              },
              api.default ?? null,
              {
                immediate: api.immediate !== false,
                shallow: !!api.shallow,
              }
            );
            // watch(requestConfig, state[key]?.execute, { deep: true });
          }
        },
        { immediate: true, deep: true }
      );
    },
  };
};
