import Vue from 'vue';

type mixinWindowSizeType = {
  onResize?: (width: number, height: number) => void;
};

const mixinWindowSize = (options?: mixinWindowSizeType) =>
  Vue.extend({
    data() {
      return {
        mixinWindowSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      };
    },
    mounted() {
      window.addEventListener('resize', this.__updateWindowSize);
    },
    destroyed() {
      window.removeEventListener('resize', this.__updateWindowSize);
    },
    methods: {
      __updateWindowSize() {
        this.mixinWindowSize.width = window.innerWidth;
        this.mixinWindowSize.height = window.innerHeight;
        if (options && options.onResize) {
          options.onResize(window.innerWidth, window.innerHeight);
        }
      },
    },
  });

export { mixinWindowSize };
