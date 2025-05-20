import * as React from "react";
import { ACTION_TYPES } from "../utils/constants";

type DirtyFieldAction<T> =
  | {
      type: typeof ACTION_TYPES.SET_DIRTY;
      field: keyof T;
    }
  | { type: typeof ACTION_TYPES.SET_ALL_DIRTY }
  | { type: typeof ACTION_TYPES.RESET_ALL };

function mapKeyAndValue<T extends Record<string, boolean>>(object: T, value: boolean): T {
  return Object.keys(object).reduce((acc, key) => {
    acc[key as keyof T] = value as T[keyof T];
    return acc;
  }, {} as T);
}

/**
 * Custom hook to manage "dirty" form fields state.
 *
 * @template T - An object with string keys and boolean values representing field dirtiness.
 * @param initialState - Initial state object where each key represents a field and the value indicates if it's dirty.
 * @returns A tuple containing the current dirty field state and a dispatch function for the reducer.
 */
export default function useDirtyField<T extends { [key: string]: boolean }>(initialState: T) {
  function dirtyFieldReducer(state: T, action: DirtyFieldAction<T>): T {
    switch (action.type) {
      case ACTION_TYPES.SET_DIRTY:
        return { ...state, [action.field]: true };
      case ACTION_TYPES.SET_ALL_DIRTY:
        return mapKeyAndValue(state, true);
      case ACTION_TYPES.RESET_ALL:
        return mapKeyAndValue(state, false);
      default:
        return state;
    }
  }

  const [dirtyField, dispatchDirtyFieldReducer] = React.useReducer(dirtyFieldReducer, initialState);

  return [dirtyField, dispatchDirtyFieldReducer] as const;
}
