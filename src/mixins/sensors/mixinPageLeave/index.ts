import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import {
  decideReturnDebounceOrThrottleOrOriginal,
  on,
  off,
} from '../../../utils';

type mixinPageLeaveType = {
  onPageLeave?: (pageLeavCount: number) => void;
} & debounceAndThrottleType;

const makePageLeave = (
  mountedRef: mountedRefType,
  options?: mixinPageLeaveType
) => {
  function innerPageLeave(this: any, event: MouseEvent) {
    if (mountedRef.isMounted) {
      event = event ? event : (window.event as any);
      const from = event.relatedTarget || (event as any).toElement;
      if (!from || (from as any).nodeName === 'HTML') {
        this.mixinPageLeave.count += 1;
        if (options?.onPageLeave) {
          options.onPageLeave(this.mixinPageLeave.count);
        }
      }
    }
  }
  return decideReturnDebounceOrThrottleOrOriginal(innerPageLeave, options);
};

const mixinPageLeave = (options?: mixinPageLeaveType) => {
  const mountedRef = {
    isMounted: false,
  };

  return Vue.extend({
    data() {
      return {
        mixinPageLeave: {
          count: 0,
        },
      };
    },
    mounted() {
      mountedRef.isMounted = true;
      on(window, 'mouseout', this.__updatePageLeave);
    },
    destroyed() {
      mountedRef.isMounted = false;
      off(window, 'mouseout', this.__updatePageLeave);
    },
    methods: {
      __updatePageLeave: makePageLeave(mountedRef, options),
    },
  });
};

export { mixinPageLeave };
