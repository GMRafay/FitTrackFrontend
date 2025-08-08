import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
}
const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
interface User {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthState() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthState must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const fetchMe = async (access_token: string) => {
    const { data } = await axios.get<User>(baseUrl + "users/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    setUser(data);
  };

  const checkAuthState = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      if (access_token) {
        setIsLoggedIn(true);
        await fetchMe(access_token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (access_token: string, userData: User) => {
    try {
      await SecureStore.setItemAsync("access_token", access_token);

      setIsLoggedIn(true);
      await fetchMe(access_token);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");

      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
