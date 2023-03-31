---
outline: deep
---

# Template Compiler

> :bulb: The recommended full-featured compiler, it compiles `node` from json to vue.js SFC template. You can use `@click`, `v-model` or any other vue.js template syntax in your `props`.

```vue
<script setup lang="ts">
import { useTopCom } from "vue-top-com";

import { useTopCom, templateCompiler } from "../..";
const { register } = useTopCom({
    compiler: templateCompiler
})
const MyCom = register({
    name: "MyCom",
    data: {
        count: 1
    },
    node: { 
        tag: "div",
        children: [
            {
                tag: "b",
                props: {
                    '@click': "count++"
                },
                text: "You've clicked {{count}} times."
            }
        ]
    }
});
</script>

<template>
  <MyCom />
</template>
```

## Results
---
<script setup lang="ts">

import { useTopCom, templateCompiler } from "../..";
const { register } = useTopCom({
    compiler: templateCompiler
})
const MyCom = register({
    name: "MyCom",
    data: {
        count: 1
    },
    node: { 
        tag: "div",
        children: [
            {
                tag: "b",
                props: {
                    '@click': "count++"
                },
                text: "You've clicked {{count}} times."
            }
        ]
    }
});
</script>

<MyCom />
