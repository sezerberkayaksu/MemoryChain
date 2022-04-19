import { useCallback, useState } from "react";

const useSetState = (initialState) => {
  const [state, set] = useState(initialState);
  const setState = useCallback((patch) => {
    set((prevState) => {
      return Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch);
    });
  }, []);

  return [state, setState];
};

export default useSetState;
