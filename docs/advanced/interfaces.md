---
outline: deep
---

# Interfaces

```ts
export interface ConfigOptions {
  evalPrefix?: string;
  autoEvalFunction?: boolean;
}

export interface TopComConfigFields {
  node?: string;
  tag?: string;
  text?: string;
  props?: string;
  children?: string;
}

export interface TopComConfig {
  name: string;
  node?: TopComNode;
  template?: string;
  title?: string;
  state?: any;
  global?: boolean;
  log?: boolean;
  options?: ConfigOptions;
  fields?: TopComConfigFields;
  [key: string]: any;

}
export interface TopComCompiler {
  name: string;
  compile: (config: TopComConfig) => any;
}
export interface TopComOptions {
  compiler?: TopComCompiler;
  plugins?: TopComPlugin[];
  asyncComponentOptions?: Omit<AsyncComponentOptions<any>, 'loader'>
}

export interface TopComNode {
  tag: string;
  text?: any;
  props?: any;
  children?: TopComNode[];
  [key: string]: any;
}

export interface TopComPlugin {
  initState?: (config: TopComConfig, state: any) => void;
  initConfig?: (config: TopComConfig) => Promise<void> | void;
}

```