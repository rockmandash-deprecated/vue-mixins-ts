<template>
  <div>
    <!-- you can access these property, if you forgot, you can go to component and simply type this.mixin... and you will get all available property -->
    <div>x: {{ mixinMousePositionAtPage.x }}</div>
    <div>y: {{ mixinMousePositionAtPage.y }}</div>
  </div>
</template>

<script lang="ts">
import { mixins, mixinMousePositionAtPage } from '../../../';

const customMixin = mixinMousePositionAtPage();
// or
const customMixin2 = mixinMousePositionAtPage({
  onMouseMove: (x, y) => {
    // a custom callback for you
    console.log(x, y);
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
    console.log(this.mixinMousePositionAtPage.x);
    console.log(this.mixinMousePositionAtPage.y);
  },
});
</script>
