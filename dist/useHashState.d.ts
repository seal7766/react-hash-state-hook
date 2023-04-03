declare type useHashStateProps<State> = {
    keys: (keyof State)[];
};
declare const useHashState: <State extends Record<string, any> = {}>({ keys, }: useHashStateProps<State>) => readonly [Partial<State>, (newState: Partial<State>) => void];
export default useHashState;
