import Vue from 'vue';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

type mixinMousePositionAtPageType = {
  onMouseMove?: (x: number, y: number) => void;
  debounce?: {
    wait?: number;
    options?: Parameters<typeof debounce>[2];
  };
  throttle?: {
    wait?: number;
    options?: Parameters<typeof throttle>[2];
  };
};

type mountedRefType = {
  isMounted: boolean;
};

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
  if (options?.debounce) {
    return debounce(
      innerUpdateMousePagePosition,
      options.debounce.wait,
      options.debounce.options
    );
  }
  if (options?.throttle) {
    return throttle(
      innerUpdateMousePagePosition,
      options.throttle.wait,
      options.throttle.options
    );
  }
  return innerUpdateMousePagePosition;
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
