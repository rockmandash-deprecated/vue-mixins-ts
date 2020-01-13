import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import {
  decideReturnDebounceOrThrottleOrOriginal,
  isClient,
  on,
  off,
} from '../../../utils';

type mixinMediaType = {
  query: string;
  defaultState?: boolean;
  onMatchMedia?: (isMatched: boolean) => void;
} & debounceAndThrottleType;

const makeUpdateMedia = (
  mountedRef: mountedRefType,
  options?: mixinMediaType
) => {
  function innerUpdateMedia(this: any, event: MouseEvent) {
    if (mountedRef.isMounted) {
      this.mixinMedia.x = event.pageX;
      this.mixinMedia.y = event.pageY;
      if (options?.onMouseMove) {
        options.onMouseMove(event.pageX, event.pageY);
      }
    }
  }
  return decideReturnDebounceOrThrottleOrOriginal(innerUpdateMedia, options);
};

const mixinMedia = (options: mixinMediaType) => {
  const mountedRef = {
    isMounted: false,
  };

  const mql = window.matchMedia(options.query);

  return Vue.extend({
    data() {
      return {
        mixinMedia: {
          isMatched: isClient
            ? window.matchMedia(options.query).matches
            : Boolean(options.defaultState),
        },
      };
    },
    mounted() {
      mountedRef.isMounted = true;
      on(window, 'mousemove', this.__updateMedia);
    },
    destroyed() {
      mountedRef.isMounted = false;
      off(window, 'mousemove', this.__updateMedia);
    },
    methods: {
      __updateMedia: makeUpdateMedia(mountedRef, options),
    },
  });
};

export { mixinMedia };
