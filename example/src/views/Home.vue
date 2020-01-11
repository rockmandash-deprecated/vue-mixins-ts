<template>
  <div>
    <div>
      Home
    </div>
    <!-- <mouse-page-position v-slot="{ x, y }"> -->
    <div>x: {{ mixinMousePositionAtPage.x }}</div>
    <div>y: {{ mixinMousePositionAtPage.y }}</div>
    <!-- </mouse-page-position> -->
  </div>
</template>

<script lang="ts">
// import Vue, { VueConstructor } from "vue";
import { mixins, mixinMousePositionAtPage, mixinWindowSize } from '@/../../src';

// const test = mixins(mixinMousePositionAtPage);

const MyComponent = mixins(
  mixinMousePositionAtPage({
    debounce: {
      wait: 300,
    },
    onMouseMove(x, y) {
      console.log(x, y);
    },
  }),
  mixinWindowSize()
).extend({
  mounted() {
    console.log(this.mixinWindowSize);
    // console.log(this.mixinMousePositionAtPage);

    // setInterval(() => {}, 100);
  },
});

// const MyComponent = (Vue.extend({
//   mixins: [mixinMousePositionAtPage]
// }) as typeof mixinMousePositionAtPage).extend({
//   mounted() {
//     setInterval(() => {
//       console.log(this.mixinMousePositionAtPage);
//     }, 100);
//   }
// });

export default MyComponent;
</script>
