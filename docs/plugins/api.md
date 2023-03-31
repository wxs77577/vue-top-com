---
outline: deep
---

# API Plugin

> :bulb: Use `apis` to setup your api requests.

```vue
<script setup lang="ts">
import { useTopCom, templateCompiler, apiPlugin } from "vue-top-com";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    apiPlugin({
      loader: (config) => fetch(config.url, config).then((res) => res.json()),
    }),
  ],
});
const MyCom = register({
  name: "MyCom",
  apis: {
    load: {
      config: {
        url: "https://api.github.com/users/vuejs/repos?per_page=5",
      },
      // immediate: false,
    },
  },
  node: {
    tag: "ol",
    children: [
      {
        tag: "li",
        props: {
          "v-for": "item in load.state",
        },
        text: "{{item.name}}",
      },
    ],
  },
});
</script>

<template>
  <MyCom />
</template>
```

## Results

---

<script setup lang="ts">

import { useTopCom, templateCompiler, apiPlugin } from "../..";
const { register } = useTopCom({
    compiler: templateCompiler,
    plugins: [
      apiPlugin({
        loader: (config) => fetch(config.url, config).then((res) => res.json()),
      }),
    ]
});
const MyCom = register({
    name: "MyCom",
    apis: {
      load: {
        config: {
          url: "https://api.github.com/users/vuejs/repos?per_page=5",
        },
        // immediate: false,
      },
    },
    node: {
      tag: "ol",
      children: [
        {
          tag: "li",
          props: {
            'v-for': 'item in load.state'
          },
          text: '{{item.name}}'
        },
      ],
    },
  });
</script>

<ClientOnly>
  <MyCom />
</ClientOnly>