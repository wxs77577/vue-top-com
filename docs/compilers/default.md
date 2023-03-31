---
outline: deep
---

# Default Compiler

> :bulb: The built-in default compiler, it compiles `node` from json to render function.

```vue
<script setup lang="ts">
import { useTopCom } from "vue-top-com";

import { useTopCom } from "../..";
const { register } = useTopCom()
const MyCom = register({
    name: "MyCom",
    node: { 
        tag: "div",
        children: [
            {
                tag: "b",
                props: {
                    style: 'color:red'
                },
                text: "It's ok."
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

import { useTopCom } from "../..";
const { register } = useTopCom()
const MyCom = register({
    name: "MyCom",
    node: { 
        tag: "div",
        children: [
            {
                tag: "b",
                props: {
                    style: 'color:red'
                },
                text: "It's ok."
            }
        ]
    }
});
</script>

<MyCom />
