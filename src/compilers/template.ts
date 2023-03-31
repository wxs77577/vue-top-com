import { compile as compileDOM } from "@vue/compiler-dom";
import type { TopComCompiler, TopComConfig, TopComNode } from "..";
import * as Vue from "vue";

export const compile = compileDOM;

export const compileToRender = (template:string) => {
  const { code } = compile(template);
  return new Function("Vue", code)(Vue);
}

export const compileToTemplate = (
  node: TopComNode,
  config: TopComConfig
) => {
  const defaultFields = {
    tag: "tag",
    text: "text",
    props: "props",
    children: "children",
  };
  const fields = Object.assign(defaultFields, config.fields ?? {});
  const attrs = Object.keys(node[fields.props] ?? {})
    .map((k) => `${k}="${String(node[fields.props][k])}"`)
    .join(" ");
  const innerText = [
    node[fields.children]
      ?.map((v) => compileToTemplate(v, config))
      .join("\n") ?? "",
    node[fields.text] ?? "",
  ].join("\n");
  const template = `<${node[fields.tag]} ${attrs}>${innerText}</${
    node[fields.tag]
  }>`;
  return template;
};

export const templateCompiler: TopComCompiler = {
  name: "templateCompiler",
  compile(config: TopComConfig) {
    const template = config.node
      ? compileToTemplate(config.node!, config)
      : config.template ?? "";
    return compileToRender(template)
  },
};
