import { resolveComponent, h, getCurrentInstance } from "vue";
import type { TopComCompiler, TopComNode } from "..";

export const defaultCompiler: TopComCompiler = {
  name: "defaultCompiler",
  compile(config) {
    const render = (node: TopComNode) => {
      const app = getCurrentInstance()!;
      const Tag = app.appContext.config.isNativeTag?.(node.tag)
        ? node.tag
        : resolveComponent(node.tag);
      return h(Tag, node.props, {
        default: () =>
          node.children?.map((subNode) => render(subNode)) ?? node.text,
        ...(node.slots ?? {}),
      });
    };
    return (ctx) => render(config.node!);
  },
};
