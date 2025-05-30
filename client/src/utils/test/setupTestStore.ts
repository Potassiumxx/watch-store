import { useAuthStore } from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { useUserStore } from "../../store/userStore";

type TestStoreState = {
  isUserSignedIn?: boolean;
  globalUsername?: string;
};

type UIStoreTestState = {
  isLoading?: boolean;
};

export function setupTestStore({ isUserSignedIn = false, globalUsername = "" }: TestStoreState = {}) {
  useAuthStore.setState({ isUserSignedIn });
  useUserStore.setState({ globalUsername });
}

export function setupUIStoreTest({ isLoading = false }: UIStoreTestState) {
  useUIStore.setState({ isLoading });
}
