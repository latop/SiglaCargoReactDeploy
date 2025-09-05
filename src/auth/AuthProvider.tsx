"use client";
import { useToast } from "@/hooks/useToast";
import api from "@/services/configs/api";
import dayjs, { Dayjs } from "dayjs";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthenticatedResponse {
  authenticated: boolean;
  created?: Dayjs;
  expiration: Dayjs;
  accessToken: string;
  userName: string;
  message?: string;
}

interface User {
  userName: string;
  accessToken: string;
  expiration: Dayjs;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  handleLogin: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  handleLogout: () => void;
}

// Constants
const STORAGE_KEY = "@pepsico:user";
const COOKIE_KEY = "@pepsico:accessToken";
const currentTime = dayjs();

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/"];

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { addToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = useCallback(() => {
    return PUBLIC_ROUTES.includes(pathname);
  }, [pathname]);

  const saveUserData = useCallback((userData: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    document.cookie = `${COOKIE_KEY}=${userData.accessToken}; expires=${dayjs(
      userData.expiration,
    ).toDate()}; path=/;`;
  }, []);

  const clearUserData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }, []);

  const isTokenExpired = useCallback((expiration: Dayjs) => {
    return currentTime.isAfter(expiration);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    clearUserData();
    router.push("/");
  }, [clearUserData, router]);

  const getAuth = useCallback(
    async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<AuthenticatedResponse | string> => {
      try {
        const { data } = await api.post("/api/Login", {
          userLogin: username,
          password,
          domain: "application",
        });

        if (data.message === "Authentication Failed") {
          console.error(data.message);
          addToast("Credenciais inválidas.", { type: "error" });
          return data.message;
        }

        addToast(`Bem vindo ${data.userName}!`, { type: "success" });
        return data;
      } catch (error) {
        console.error(error);
        addToast("Credenciais inválidas.", { type: "error" });
        throw error;
      }
    },
    [addToast],
  );

  const handleLogin = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      setLoading(true);
      try {
        const data = await getAuth({
          username,
          password,
        });

        if (typeof data === "string") {
          return;
        }

        const { authenticated, accessToken, userName, expiration } = data;
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const userInfo = { userName, accessToken, expiration };
          setUser(userInfo);
          saveUserData(userInfo);
          router.push("/home");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [getAuth, router, saveUserData],
  );

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (isTokenExpired(parsedUser.expiration)) {
          handleLogout();
        } else {
          setUser(parsedUser);
          setIsAuthenticated(true);
          router.push("/home");
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        handleLogout();
      }
    } else {
      router.push("/");
    }
  }, [router, handleLogout, isTokenExpired]);

  useEffect(() => {
    if (isPublicRoute()) {
      return;
    }

    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (!storedUser) {
      // No user data found, redirect to login
      router.push("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (isTokenExpired(parsedUser.expiration)) {
        handleLogout();
        addToast("Sua sessão expirou. Por favor, faça login novamente.", {
          type: "error",
        });
      } else {
        if (!isAuthenticated) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      handleLogout();
    }
  }, [
    pathname,
    router,
    isAuthenticated,
    addToast,
    handleLogout,
    isTokenExpired,
    isPublicRoute,
  ]);

  // Context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    loading,
    user,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
