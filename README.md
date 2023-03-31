# vue-top-com

https://wxs77577.github.io/vue-top-com/

Load vuejs components from json in production mode dynamically.


## Install
```sh
npm i vue-top-com
yarn add vue-top-com
pnpm add vue-top-com
```

### Quick Start

```html
<script setup lang="ts">

import { useTopCom } from "vue-top-com";

const { register } = useTopCom()

const MyCom = register({
    name: "MyCom",
    data: {
        msg: "My first top com."
    },
    node: { 
        tag: "el-button",
        text: "{{msg}}" 
    }
})

</script>

<template>
    <MyCom />
</template>
```

### Advanced Usage

```html
<script setup lang="ts">
import { h, ref } from "vue";
import {
  useTopCom,
  urlLoaderPlugin,
  templateCompiler,
  evalPlugin,
  apiPlugin,
  cdnPlugin,
} from "vue-top-com";
const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    urlLoaderPlugin(),
    evalPlugin(),
    apiPlugin({
      loader: (config) => fetch(config.url, config).then((res) => res.json()),
    }),
    cdnPlugin(),
  ],
  asyncComponentOptions: {
    loadingComponent: {
      render: () => h("b", "loading..."),
    },
  },
});

const json = ref([
  { name: "RemoteCom", url: "/api/remote-com.json" },
  {
    name: "EvalCom",
    props: {
      // compiles into `msg: Array`
      msg: "$: {type: String, default: 'Hello'}",
    },
    methods: {
      log: "$:function(s){ console.log(s) }",
    },
    // or you can use `node` field to define in json format
    template: `<span @click="log(msg)">{{msg}}</span>`,
  },
  {
    name: "ProductList",
    apis: {
      load: {
        config: {
          url: "/api/products.json",
        },
        immediate: true,
      },
    },
    node: {
      // please ensure to install `element-plus`
      tag: "el-table",
      props: {
        ":data": "load.state",
      },
      children: [
        {
          tag: "el-table-column",
          props: {
            label: "Product Name",
            prop: "name",
          },
        },
      ],
    },
  },
  {
    name: "CdnCom",
    scripts: ["https://unpkg.com/dayjs"],
    styles: ["https://unpkg.com/bootstrap@5.2.3/dist/css/bootstrap.min.css"],
    node: {
      tag: "button",
      props: {
        class: "btn btn-primary",
      },
      text: "Now is {{dayjs().format()}}",
    },
  },
]);

const components = json.value.map((v) => register(v));

</script>

<template>
  <div v-for="component in components" style="padding: 1rem">
    <component :is="component" />
  </div>
</template>

```
