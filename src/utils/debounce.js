import { useState, useCallback } from "react";

const debounce = (fun, delay) => {
  let timer = null;
  return function (...args) {
    // console.log("参数：", args);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun(...args);
    }, delay);
  };
};

export const useDebounce = (obj = null, delay = 1000) => {
  const [state, setState] = useState(obj);
  const setDebounceState = (value) => {
    _debounce(value);
  };
  const _debounce = useCallback(debounce(setState, delay), []);

  return [state, setDebounceState];
};
