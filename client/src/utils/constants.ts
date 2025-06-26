export const GENERAL_ERROR_KEY: string = "general_err";

export const BACKEND_API_URL = import.meta.env.VITE_APP_API_URL;

// dirtyFieldReducer action types
export const ACTION_TYPES = {
  SET_DIRTY: "SET_DIRTY",
  SET_ALL_DIRTY: "SET_ALL_DIRTY",
  RESET_ALL: "RESET_ALL",
} as const;
