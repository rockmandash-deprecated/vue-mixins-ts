import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

type mountedRefType = {
  isMounted: boolean;
};

type debounceAndThrottleType = {
  debounce?: {
    wait?: number;
    options?: Parameters<typeof debounce>[2];
  };
  throttle?: {
    wait?: number;
    options?: Parameters<typeof throttle>[2];
  };
};

export { mountedRefType, debounceAndThrottleType };
