import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { debounceAndThrottleType } from './types';

const decideReturnDebounceOrThrottleOrOriginal = (
  callback: (...args: any) => any,
  options?: debounceAndThrottleType
) => {
  if (options?.debounce) {
    return debounce(callback, options.debounce.wait, options.debounce.options);
  }
  if (options?.throttle) {
    return throttle(callback, options.throttle.wait, options.throttle.options);
  }
  return callback;
};

export { decideReturnDebounceOrThrottleOrOriginal };
