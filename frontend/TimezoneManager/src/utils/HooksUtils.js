/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

function useDidMountUnmount(onMount, onUnmount) {
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default {
  useDidMountUnmount,
  useDebounce,
  useDidUpdate,
  usePrevious
};
