import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import {
  decideReturnDebounceOrThrottleOrOriginal,
  isClient,
  on,
  off,
} from '../../../utils';

type mixinWindowSizeType = {
  onResize?: (width: number, height: number) => void;
  initialWidth?: number;
  initialHeight?: number;
} & debounceAndThrottleType;

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
    data() {
      return {
        mixinWindowSize: {
          width: isClient
            ? window.innerWidth
            : options?.initialWidth || Infinity,
          height: isClient
            ? window.innerHeight
            : options?.initialHeight || Infinity,
        },
      };
    },
    mounted() {
      mountedRef.isMounted = true;
      on(window, 'resize', this.__updateWindowSize);
    },
    destroyed() {
      mountedRef.isMounted = false;
      off(window, 'resize', this.__updateWindowSize);
    },
    methods: {
      __updateWindowSize: makeUpdateWindowSize(mountedRef, options),
    },
  });
};

export { mixinWindowSize };
