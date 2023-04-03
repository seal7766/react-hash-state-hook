import { useCallback, useEffect, useState } from 'react';
import getHashParams from './utils/getHashParams';

type useHashStateProps<State> = {
  keys: (keyof State)[];
};

const useHashState = <State extends Record<string, any> = {}>({
  keys,
}: useHashStateProps<State>) => {
  const [state, setHookState] = useState<Partial<State>>(getHashParams(keys));

  const onChangeHash = useCallback(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const newState = keys
      .map(key => {
        const strKey = String(key);
        const value = hashParams.get(strKey);
        return { [strKey]: value };
      })
      .reduce((prev, cur) => {
        return {
          ...prev,
          ...cur,
        };
      }, {});

    setHookState(prevState => {
      return { ...prevState, ...newState };
    });
  }, [keys]);

  useEffect(() => {
    window.addEventListener('hashchange', onChangeHash);
    return window.removeEventListener('hashchange', onChangeHash);
  }, [onChangeHash]);

  const setState = (newState: Partial<State>) => {
    const updateState = { ...state, ...newState };
    setHookState(updateState);

    const url = new URL(window.location.href);
    url.hash = Object.entries(updateState)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join('&');
    window.history.pushState(null, '', url.toString());
  };

  return [state, setState] as const;
};

export default useHashState;
