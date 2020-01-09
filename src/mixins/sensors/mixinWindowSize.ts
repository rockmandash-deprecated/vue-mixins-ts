import Vue from "vue";

const mixinWindowSize = Vue.extend({
  data() {
    return {
      mixinWindowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  },
  mounted() {
    window.addEventListener("resize", this.__updateWindowSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.__updateWindowSize);
  },
  methods: {
    __updateWindowSize() {
      this.mixinWindowSize.width = window.innerWidth;
      this.mixinWindowSize.height = window.innerHeight;
    }
  }
});

export { mixinWindowSize };
