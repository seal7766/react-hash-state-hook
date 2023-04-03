const getHashParams = <State>(keys: (keyof State)[]): Partial<State> => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  return keys.reduce((prev, cur) => {
    const strKey = String(cur);
    const value = hashParams.get(strKey);
    return { ...prev, [strKey]: value ?? void 0 };
  }, {});
};

export default getHashParams;
