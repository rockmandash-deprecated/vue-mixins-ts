import Vue from 'vue';
import { mountedRefType, debounceAndThrottleType } from '../../../types';
import { decideReturnDebounceOrThrottleOrOriginal } from '../../../utils';

type mixinMousePositionAtPageType = {
  onMouseMove?: (x: number, y: number) => void;
} & debounceAndThrottleType;

const createInitialData = () => ({
  mixinMousePositionAtPage: {
    x: 0,
    y: 0,
  },
});

const makeUpdateMousePagePosition = (
  mountedRef: mountedRefType,
  options?: mixinMousePositionAtPageType
) => {
  function innerUpdateMousePagePosition(this: any, event: MouseEvent) {
    if (mountedRef.isMounted) {
      this.mixinMousePositionAtPage.x = event.pageX;
      this.mixinMousePositionAtPage.y = event.pageY;
      if (options?.onMouseMove) {
        options.onMouseMove(event.pageX, event.pageY);
      }
    }
  }
  return decideReturnDebounceOrThrottleOrOriginal(
    innerUpdateMousePagePosition,
    options
  );
};

const mixinMousePositionAtPage = (options?: mixinMousePositionAtPageType) => {
  const mountedRef = {
    isMounted: false,
  };

  return Vue.extend({
    data: createInitialData,
    mounted() {
      mountedRef.isMounted = true;
      window.addEventListener('mousemove', this.__updateMousePagePosition);
    },
    destroyed() {
      mountedRef.isMounted = false;
      window.removeEventListener('mousemove', this.__updateMousePagePosition);
    },
    methods: {
      __updateMousePagePosition: makeUpdateMousePagePosition(
        mountedRef,
        options
      ),
    },
  });
};

export { mixinMousePositionAtPage };
