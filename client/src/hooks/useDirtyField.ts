import * as React from "react";
import { ACTION_TYPES } from "../utils/constants";

interface DirtyFieldState {
  email: boolean;
  password: boolean;
  username?: boolean;
}

type DirtyFieldAction =
  | {
      type: typeof ACTION_TYPES.SET_DIRTY;
      field: keyof DirtyFieldState;
    }
  | { type: typeof ACTION_TYPES.SET_ALL_DIRTY }
  | { type: typeof ACTION_TYPES.RESET_ALL };

export default function useDirtyField() {
  function dirtyFieldReducer(state: DirtyFieldState, action: DirtyFieldAction): DirtyFieldState {
    switch (action.type) {
      case ACTION_TYPES.SET_DIRTY:
        return { ...state, [action.field]: true };
      case ACTION_TYPES.SET_ALL_DIRTY:
        return { email: true, password: true, username: true };
      case ACTION_TYPES.RESET_ALL:
        return { email: false, password: false, username: false };
      default:
        return state;
    }
  }

  const [dirtyField, dispatchDirtyFieldReducer] = React.useReducer(dirtyFieldReducer, {
    email: false,
    password: false,
    username: false,
  });

  return [dirtyField, dispatchDirtyFieldReducer] as const;
}
