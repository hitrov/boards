// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
import { LOCAL_STORAGE_STATE_KEY } from './constants';
import { RootState } from './reducers';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, serializedState);
  } catch {
    // ignore write errors
  }
};
