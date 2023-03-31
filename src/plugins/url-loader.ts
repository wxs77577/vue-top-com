import { ref } from "vue";
import type { TopComPlugin } from "..";

declare module ".." {
  interface TopComConfig {
    url?: string;
  }
}

export const urlLoaderPlugin = (): TopComPlugin => {
  const versions = ref({} as any);
  return {
    async initConfig(config) {
      const getNextVersion = (url: string) => {
        return (versions.value[url] = (versions.value[url] ?? 0) + 1);
      };

      const load = async (url: string) => {
        const uri = new URL(url, location.href);
        uri.searchParams.set("__v__", getNextVersion(url).toString());
        const res = await fetch(uri);
        return res.json();
      };

      if (config.url) {
        Object.assign(config, await load(config.url));
      }
    },
  };
};
