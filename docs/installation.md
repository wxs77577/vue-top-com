---
outline: deep
---

# Installation

## Step 1

```sh
npm i vue-top-com
yarn add vue-top-com
pnpm add vue-top-com
```

## Step 2

```vue
<script setup lang="ts">
import { useTopCom } from "vue-top-com";

const { register } = useTopCom()
const MyCom = register({
    name: "MyCom",
    node: { 
        tag: "h5",
        text: "My first top com." 
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
import { useTopCom } from "..";
const { register } = useTopCom()
const MyCom = register({
    name: "MyCom",
    node: { 
        tag: "b",
        text: "My first top com." 
    }
});
</script>

<MyCom />
