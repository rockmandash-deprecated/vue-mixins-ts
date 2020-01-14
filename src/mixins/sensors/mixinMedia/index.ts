import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import {
  decideReturnDebounceOrThrottleOrOriginal,
  isClient,
} from '../../../utils';

type mixinMediaType = {
  query: string;
  queryName: string;
  defaultState?: boolean;
  onMatchMedia?: (isMatched: boolean) => void;
} & debounceAndThrottleType;

const makeUpdateMedia = (
  mountedRef: mountedRefType,
  options: mixinMediaType,
  mql?: MediaQueryList
) => {
  function innerUpdateMedia(this: any) {
    if (mountedRef.isMounted) {
      this.mixinMedia[options.queryName] = mql!.matches;
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
          [options.queryName]: isClient
            ? mql!.matches
            : Boolean(options.defaultState),
        },
      };
    },
    mounted() {
      mountedRef.isMounted = true;
      mql!.addListener(this['__updateMedia_' + options.queryName]);
    },
    destroyed() {
      mountedRef.isMounted = false;
      mql!.removeListener(this['__updateMedia_' + options.queryName]);
    },
    methods: {
      ['__updateMedia_' + options.queryName]: makeUpdateMedia(
        mountedRef,
        options,
        mql
      ),
    },
  });
};

export { mixinMedia };
