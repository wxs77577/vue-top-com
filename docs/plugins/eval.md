---
outline: deep
---

# Eval Plugin

> :bulb: Evaluate js expressions for plain JSON.

```vue
<script setup lang="ts">

import { useTopCom, templateCompiler, evalPlugin } from "vue-top-com";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    evalPlugin()
  ],
});
const MyCom = register({
  name: "MyCom",
  props: {
      greeting: "$: {type: String, default: 'You are'}",
    },
    data: {
      no: 1
    },
    methods: {
      add: "$:function(s){ this.no++; }",
    },
    template: `<div><span @click="add">{{greeting}} No.{{no}}.</span></div>`,
});
</script>

<MyCom />

```

## Results

---

<script setup lang="ts">

import { useTopCom, templateCompiler, evalPlugin } from "../..";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    evalPlugin()
  ],
});
const MyCom = register({
  name: "MyCom",
  props: {
      greeting: "$: {type: String, default: 'You are'}",
    },
    data: {
      no: 1
    },
    methods: {
      add: "$:function(s){ this.no++; }",
    },
    template: `<div><span @click="add">{{greeting}} No.{{no}}.</span></div>`,
});
</script>

<ClientOnly>
  <MyCom />
</ClientOnly>