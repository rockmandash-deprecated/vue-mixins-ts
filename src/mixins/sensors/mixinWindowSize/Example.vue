<template>
  <div>
    <!-- you can access these property, if you forgot, you can go to component and simply type this.mixin... and you will get all available property -->
    <div>width: {{ mixinWindowSize.width }}</div>
    <div>height: {{ mixinWindowSize.height }}</div>
  </div>
</template>

<script lang="ts">
import { mixins, mixinWindowSize } from '../../../'; // replace the path with 'vue-mixins-ts';

const customMixin = mixinWindowSize();
// or
const customMixin2 = mixinWindowSize({
  initialWidth: 100,
  initialHeight: 200,
  onResize: (width, height) => {
    // a custom callback for you
    console.log(width, height);
  },
  debounce: {
    wait: 300, // provide wait option (by lodash)
  },
  throttle: {
    wait: 300,
    options: {
      // or lodash throttle options
      leading: true,
      trailing: false,
    },
  },
});

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
