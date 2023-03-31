---
outline: deep
---

# Url Loader Plugin

> :bulb: Load config from remote url.

```vue
<script setup lang="ts">

import { useTopCom, templateCompiler, urlLoaderPlugin } from "vue-top-com";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    urlLoaderPlugin(),
  ],
});
const MyCom = register({
  name: "MyCom", 
  url: "/api/remote-com.json"
});
</script>

<MyCom />

```

## Results

---

<script setup lang="ts">

import { useTopCom, templateCompiler, urlLoaderPlugin } from "../..";

const { register } = useTopCom({
  compiler: templateCompiler,
  plugins: [
    urlLoaderPlugin(),
  ],
});
const MyCom = register({
  name: "MyCom", 
  url: "/api/remote-com.json"
});
</script>

<ClientOnly>
  <MyCom />
</ClientOnly>