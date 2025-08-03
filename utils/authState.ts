import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useAuthState() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authCheck = async () => {
      const access_token = await SecureStore.getItemAsync("access_token");
      if (access_token) {
        setIsLoggedIn(true);
      }
    };
    authCheck();
  }, []);

  return { isLoggedIn };
}
