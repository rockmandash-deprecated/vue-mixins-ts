<template>
  <div>
    <!-- you can access these property, if you forgot, you can go to component and simply type this.mixin... and you will get all available property -->
    <div>x: {{ mixinWindowSize.width }}</div>
    <div>y: {{ mixinWindowSize.height }}</div>
  </div>
</template>

<script lang="ts">
import { mixins, mixinWindowSize } from '../../../';

const customMixin = mixinWindowSize();
// or
// const customMixin = mixinWindowSize({
//   onResize: (width, height) => {
//     // a custom callback for you
//     console.log(width, height);
//   },
//   debounce: {
//     wait: 300, // provide wait option (by lodash)
//   },
//   throttle: {
//     wait: 300,
//     options: {
//       // or lodash throttle options
//       leading: true,
//       trailing: false,
//     },
//   },
// });

export default mixins(
  customMixin
  // you can add multiple mixin provided by 'vue-mixins-ts' here like mixinWindowSize()
).extend({
  // write your normal component here
  mounted() {
    // you can type this.mixin... and TypeScript will show all available mixin data property.
    console.log(this.mixinWindowSize.width);
    console.log(this.mixinWindowSize.height);
  },
});
</script>
