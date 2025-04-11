"use client";
import { useToast } from "@/hooks/useToast";
import api from "@/services/configs/api";
import { Dayjs } from "dayjs";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthenticatedResponse = {
  authenticated: boolean;
  created?: Dayjs;
  expiration: Dayjs;
  accessToken: string;
  userName: string;
  message?: string;
};

interface User {
  userName: string;
  accessToken: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  handleLogin: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("@pepsico:user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      router.push("/home");
    } else {
      if (!storedUser || !isAuthenticated) {
        router.push("/");
      }
    }
  }, [router, isAuthenticated]);

  const getAuth = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<AuthenticatedResponse> => {
    try {
      const { data } = await api.post("/api/Login", {
        userLogin: username,
        password: password,
        domain: "application",
      });
      addToast("Logado com sucesso!", { type: "success" });

      return data;
    } catch (error) {
      console.error(error);
      addToast("Erro ao logar", { type: "error" });
      throw error;
    }
  };

  const handleLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const { authenticated, accessToken, userName, expiration } =
        await getAuth({
          username,
          password,
        });

      setIsAuthenticated(authenticated);
      if (authenticated) {
        const userInfo = { userName, accessToken, expiration };
        setUser(userInfo);
        localStorage.setItem("@pepsico:user", JSON.stringify(userInfo));
        document.cookie = `@pepsico:accessToken=${accessToken}; path=/;`;
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    document.cookie =
      "@pepsico:accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
