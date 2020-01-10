Usage

```html
<template>
  <div>
    <!-- you can access these property, if you forgot, you can go to component and simply type this.mixin... and you will get all available property -->
    <div>x: {{ mixinMousePositionAtPage.x }}</div>
    <div>y: {{ mixinMousePositionAtPage.y }}</div>
  </div>
</template>
```

```ts
import { mixins, mixinMousePositionAtPage } from 'vue-mixins-ts';

const customMixin = mixinMousePositionAtPage();
// or
const customMixin2 = mixinMousePositionAtPage({
  onMouseMove: (x, y) => {
    console.log(x, y);
  },
});

const MyComponent = mixins(
  customMixin
  // you can add multiple mixin provided by 'vue-mixins-ts' here like mixinWindowSize()
).extend({
  mounted() {
    // you can type this.mixin... and TypeScript will show all available mixin data property.
    console.log(this.mixinMousePositionAtPage.x);
    console.log(this.mixinMousePositionAtPage.y);
  },
});
```
