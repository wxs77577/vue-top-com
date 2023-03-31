import type { TopComPlugin } from "..";
import * as Vue from 'vue'

declare module ".." {
  interface TopComConfig {
    /**
     * Full script urls from CDN
     * 
     * Loaded **Synchronously**.
     */
    scripts?: string[];
    /**
     * Full css urls from CDN
     * 
     * Loaded **Asynchronously**
     */
    styles?: string[];
    /**
     * Set vue components from `window.*` variables
     * 
     * To install Vue components from CDN
     * 
     * e.g. {'v-chart': 'VueECharts'} compiles to:
     * { 'v-chart': window['VueECharts'] }
     */
    globalComponents?: Record<string, string>;
  }
}

export const registerScript = async (src: string) => {
  const tag =
    document.querySelector<HTMLScriptElement>(`[src="${src}"]`) ??
    document.createElement("script");
  tag.src = src;
  document.head.appendChild(tag);
  await new Promise((r) => (tag.onload = r));
};

export const registerStyle = async (src: string) => {
  const tag =
    document.querySelector<HTMLLinkElement>(`[href="${src}"]`) ??
    document.createElement("link");
  tag.href = src;
  tag.rel = "stylesheet";
  document.head.appendChild(tag);
  await new Promise((r) => (tag.onload = r));
};

export const cdnPlugin = () => {
  return {
    async initConfig(config) {
      
      globalThis.Vue = Vue;

      config.styles?.forEach(registerStyle);

      for (let item of config.scripts ?? []) {
        await registerScript(item);
      }

      if (config.globalComponents) {
        const coms = {} as any;
        for (let key in config.globalComponents) {
          coms[key] = globalThis[config.globalComponents[key]];
        }
        config.components = {
          ...(config.components ?? {}),
          ...coms,
        };
      }
    },
  } as TopComPlugin;
};
