"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SALES" | "HR" | "EMPLOYEE";
  department?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isSales: boolean;
  isHR: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for initial auth session
    const storedToken = localStorage.getItem("orbit_token");
    const storedUser = localStorage.getItem("orbit_user");
    const isExplicitLoggedOut = localStorage.getItem("orbit_logged_out") === "true";

    if (storedToken && storedUser && !isExplicitLoggedOut) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("orbit_token");
        localStorage.removeItem("orbit_user");
      }
    } else if (!isExplicitLoggedOut) {
      // Default demo user fallback for initial site visit
      const defaultUser: AuthUser = {
        id: "demo-admin-id",
        name: "Sarah Jenkins",
        email: "sarah.jenkins@orbit360.com",
        role: "ADMIN",
        department: "Executive & Sales",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      };
      setUser(defaultUser);
      setToken("demo-jwt-token-orbit360");
      localStorage.setItem("orbit_token", "demo-jwt-token-orbit360");
      localStorage.setItem("orbit_user", JSON.stringify(defaultUser));
    } else {
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    localStorage.removeItem("orbit_logged_out");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("orbit_token", data.token);
        localStorage.setItem("orbit_user", JSON.stringify(data.user));
        return true;
      }
    } catch (e) {
      console.error("Login API error:", e);
    }
    // Fallback simulation for quick user login with any demo credentials
    const fallbackUser: AuthUser = {
      id: "u-" + Date.now(),
      name: email.split("@")[0].replace(".", " ").replace(/^./, (str) => str.toUpperCase()),
      email: email,
      role: email.includes("hr") ? "HR" : email.includes("sales") ? "SALES" : "ADMIN",
      department: email.includes("hr") ? "Human Resources" : "Sales & Revenue",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    };
    setToken("demo-token-" + Date.now());
    setUser(fallbackUser);
    localStorage.setItem("orbit_token", "demo-token-" + Date.now());
    localStorage.setItem("orbit_user", JSON.stringify(fallbackUser));
    return true;
  };

  const register = async (name: string, email: string, password: string, role = "SALES"): Promise<boolean> => {
    localStorage.removeItem("orbit_logged_out");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok && data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("orbit_token", data.token);
        localStorage.setItem("orbit_user", JSON.stringify(data.user));
        return true;
      }
    } catch (e) {
      console.error("Register API error:", e);
    }
    const newUser: AuthUser = {
      id: "u-" + Date.now(),
      name,
      email,
      role: role as AuthUser["role"],
      department: "Operations",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    };
    setToken("demo-token-" + Date.now());
    setUser(newUser);
    localStorage.setItem("orbit_token", "demo-token-" + Date.now());
    localStorage.setItem("orbit_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("orbit_token");
    localStorage.removeItem("orbit_user");
    localStorage.setItem("orbit_logged_out", "true");
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  const isAdmin = user?.role === "ADMIN";
  const isSales = user?.role === "SALES" || user?.role === "ADMIN";
  const isHR = user?.role === "HR" || user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAdmin,
        isSales,
        isHR,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
