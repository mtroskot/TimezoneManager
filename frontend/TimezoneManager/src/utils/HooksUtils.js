import { useEffect, useRef } from 'react';

function useDidMountUnmount(onMount, onUnmount) {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    onMount();
    if (onUnmount) {
      return onUnmount;
    }
  }, []);
}

function useDidUpdate(callback, deps, clearCallback) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
      if (clearCallback) {
        return clearCallback;
      }
    } else {
      didMount.current = true;
    }
  }, deps);
}

function useDebounce(callback, deps, timeout = 500, clearCallback) {
  const hasMount = useRef(false);
  useEffect(() => {
    if (hasMount.current) {
      const handler = setTimeout(() => {
        callback();
      }, timeout);
      return () => {
        if (clearCallback) {
          clearCallback();
        }
        clearTimeout(handler);
      };
    } else {
      hasMount.current = true;
    }
  }, deps);
}

export default {
  useDidMountUnmount,
  useDebounce,
  useDidUpdate
};
