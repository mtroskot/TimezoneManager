/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from 'react';

function useDidMountUnmount(onMount: () => void, onUnmount?: () => void) {
    useEffect(() => {
        onMount();
        if (onUnmount) {
            return onUnmount;
        }
    }, []);
}

function useDidUpdate(callback: () => void, deps: any[], clearCallback?: () => void) {
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

function useDebounce(callback: () => void, deps: any[], timeout = 500, clearCallback: () => void) {
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

function usePrevious(value: any) {
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
