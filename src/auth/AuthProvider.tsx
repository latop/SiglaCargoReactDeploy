"use client";
import { useToast } from "@/hooks/useToast";
import api from "@/services/configs/api";
import dayjs, { Dayjs } from "dayjs";
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
  expiration: Dayjs;
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

const currentTime = dayjs();

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
      const expirationTime = dayjs(parsedUser.expiration);

      if (currentTime.isAfter(expirationTime)) {
        handleLogout();
      } else {
        setUser(parsedUser);
        setIsAuthenticated(true);
        router.push("/home");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const getAuth = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<AuthenticatedResponse | string> => {
    try {
      const { data } = await api.post("/api/Login", {
        userLogin: username,
        password: password,
        domain: "application",
      });

      if (data.message === "Authentication Failed") {
        console.error(data.message);
        addToast("Crendenciais inválidas.", { type: "error" });
        return data.message;
      }

      addToast("Logado com sucesso!", { type: "success" });

      return data;
    } catch (error) {
      console.error(error);
      addToast("Crendenciais inválidas.", { type: "error" });
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
        localStorage.setItem("@pepsico:user", JSON.stringify(userInfo));
        document.cookie = `@pepsico:accessToken=${accessToken}; expires=${dayjs(
          expiration,
        ).toDate()}; path=/;`;
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
    localStorage.removeItem("@pepsico:user");
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
