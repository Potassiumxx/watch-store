import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";

type TestStoreState = {
  isUserSignedIn?: boolean;
  globalUsername?: string;
};

export function setupTestStore({ isUserSignedIn = false, globalUsername = "" }: TestStoreState = {}) {
  useAuthStore.setState({ isUserSignedIn });
  useUserStore.setState({ globalUsername });
}
