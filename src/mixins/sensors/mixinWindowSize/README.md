Usage

```html
<template>
  <div>
    <!-- you can access these property, if you forgot, you can go to component and simply type this.mixin... and you will get all available property -->
    <div>x: {{ mixinWindowSize.x }}</div>
    <div>y: {{ mixinWindowSize.y }}</div>
  </div>
</template>
```

```ts
import { mixins, mixinWindowSize } from 'vue-mixins-ts';

const customMixin = mixinWindowSize();
// or
const customMixin2 = mixinWindowSize({
  onResize: (width, height) => {
    console.log(width, height);
  },
});

const MyComponent = mixins(
  customMixin
  // you can add multiple mixin provided by 'vue-mixins-ts' here like mixinMousePositionAtPage()
).extend({
  mounted() {
    // you can type this.mixin... and TypeScript will show all available mixin data property.
    console.log(this.mixinWindowSize.x);
    console.log(this.mixinWindowSize.y);
  },
});
```
