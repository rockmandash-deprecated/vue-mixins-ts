import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import {
  decideReturnDebounceOrThrottleOrOriginal,
  isClient,
} from '../../../utils';

type mixinMediaType = {
  query: string;
  defaultState?: boolean;
  onMatchMedia?: (isMatched: boolean) => void;
} & debounceAndThrottleType;

const makeUpdateMedia = (
  mountedRef: mountedRefType,
  options?: mixinMediaType,
  mql?: MediaQueryList
) => {
  function innerUpdateMedia(this: any) {
    if (mountedRef.isMounted) {
      this.mixinMedia.isMatched = mql!.matches;
      if (options?.onMatchMedia) {
        options.onMatchMedia(mql!.matches);
      }
    }
  }
  return decideReturnDebounceOrThrottleOrOriginal(innerUpdateMedia, options);
};
// support media name
const mixinMedia = (options: mixinMediaType) => {
  const mountedRef = {
    isMounted: false,
  };

  const mql = isClient ? window.matchMedia(options.query) : undefined;

  return Vue.extend({
    data() {
      return {
        mixinMedia: {
          isMatched: isClient ? mql!.matches : Boolean(options.defaultState),
        },
      };
    },
    mounted() {
      mountedRef.isMounted = true;
      mql!.addListener(this.__updateMedia);
    },
    destroyed() {
      mountedRef.isMounted = false;
      mql!.removeListener(this.__updateMedia);
    },
    methods: {
      __updateMedia: makeUpdateMedia(mountedRef, options, mql),
    },
  });
};

export { mixinMedia };
