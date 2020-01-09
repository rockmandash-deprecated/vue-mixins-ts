import Vue from "vue";

const mixinMousePositionAtPage = Vue.extend({
  data() {
    return {
      mixinMousePositionAtPage: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {
    window.addEventListener("mousemove", this.__updateMousePagePosition);
  },
  destroyed() {
    window.removeEventListener("mousemove", this.__updateMousePagePosition);
  },
  methods: {
    __updateMousePagePosition(event: MouseEvent) {
      this.mixinMousePositionAtPage.x = event.pageX;
      this.mixinMousePositionAtPage.y = event.pageY;
    }
  }
});

export { mixinMousePositionAtPage };
