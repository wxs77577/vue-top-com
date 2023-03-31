---
outline: deep
---

# CDN Plugin

> :bulb: Use `styles` and `scripts` to load external resources.

> You need to reload page manually to **unload styles** after navigate to other pages.

```vue
<script setup lang="ts">
import { useTopCom, templateCompiler, cdnPlugin } from "vue-top-com";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    cdnPlugin()
  ],
});
const MyCom = register({
  name: "MyCom",
  scripts: ["https://unpkg.com/dayjs"],
    styles: ["https://unpkg.com/bootstrap@5.2.3/dist/css/bootstrap.min.css"],
    node: {
      tag: "button",
      props: {
        class: "btn btn-primary",
      },
      text: "Now is {{dayjs().format()}}",
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

import { useTopCom, templateCompiler, cdnPlugin } from "../..";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    cdnPlugin()
  ],
});
const MyCom = register({
  name: "MyCom",
  scripts: ["https://unpkg.com/dayjs"],
  styles: ["https://unpkg.com/bootstrap@5.2.3/dist/css/bootstrap.min.css"],
  node: {
    tag: "button",
    props: {
      class: "btn btn-primary",
    },
    text: "Now is {{dayjs().format()}}",
  },
});
</script>

<ClientOnly>
  <MyCom />
</ClientOnly>
