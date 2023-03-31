import mapObject from "map-obj";
import * as Vue from "vue";
import { getCurrentInstance } from "vue";
import type { TopComPlugin } from "..";

export const evaluate = (
  context: Record<string, any>,
  input: Record<string, any>,
  { delimiters }
) => {
  const [PREFIX, POSTFIX] = delimiters;
  mapObject(
    input,
    (k, v, o) => {
      if (typeof v === "string" && v.indexOf(PREFIX) === 0) {
        const code = v
          .slice(PREFIX.length, -POSTFIX.length || undefined)
          .trim();
        // console.log({code, delimiters})
        o[String(k)] = new Function(
          "context",
          `with (context) { return ${code}; }`
        )(context);
      }
      return [k, v];
    },
    { deep: true }
  );
  return input;
};

export interface EvalPluginOptions {
  configField?: string;
  context?: any;
  delimiters?: [string, string];
  stateDelimiters?: [string, string];
}

export const evalPlugin = (options: EvalPluginOptions = {}) => {
  const app = getCurrentInstance()!;
  options = Object.assign(
    {
      configField: "config",
      context: {} as any,
      delimiters: ["$:", ""],
      stateDelimiters: ["$$:", ""],
    },
    options
  );
  const ctx = {
    ...Vue,
    ...app.appContext.config.globalProperties,
    ...options.context,
  };
  return {
    initConfig(config) {
      const delimiters = config.delimiters ?? options.delimiters;
      const configField = config.configField ?? options.configField!;
      evaluate(ctx, config, { delimiters });
      if (typeof config[configField] === "object") {
        Object.assign(config, config[configField]);
      }
    },
    initState(config, state) {
      const delimiters = config.stateDelimiters ?? options.stateDelimiters;
      evaluate({ ...ctx, ...state }, config, { delimiters });
    },
  } as TopComPlugin;
};
