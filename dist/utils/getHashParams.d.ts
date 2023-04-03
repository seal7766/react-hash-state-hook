declare const getHashParams: <State>(keys: (keyof State)[]) => Partial<State>;
export default getHashParams;
