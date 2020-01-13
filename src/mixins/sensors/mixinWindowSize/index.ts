import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import { decideReturnDebounceOrThrottleOrOriginal } from '../../../utils';

type mixinWindowSizeType = {
  onResize?: (width: number, height: number) => void;
} & debounceAndThrottleType;

const createInitialData = () => ({
  mixinWindowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

const makeUpdateWindowSize = (
  mountedRef: mountedRefType,
  options?: mixinWindowSizeType
) => {
  function innerUpdateWindowSize(this: any) {
    if (mountedRef.isMounted) {
      this.mixinWindowSize.width = window.innerWidth;
      this.mixinWindowSize.height = window.innerHeight;
      if (options && options.onResize) {
        options.onResize(window.innerWidth, window.innerHeight);
      }
    }
  }
  return decideReturnDebounceOrThrottleOrOriginal(
    innerUpdateWindowSize,
    options
  );
};

const mixinWindowSize = (options?: mixinWindowSizeType) => {
  const mountedRef = {
    isMounted: false,
  };

  return Vue.extend({
    data: createInitialData,
    mounted() {
      mountedRef.isMounted = true;
      window.addEventListener('resize', this.__updateWindowSize);
    },
    destroyed() {
      mountedRef.isMounted = false;
      window.removeEventListener('resize', this.__updateWindowSize);
    },
    methods: {
      __updateWindowSize: makeUpdateWindowSize(mountedRef, options),
    },
  });
};

export { mixinWindowSize };
