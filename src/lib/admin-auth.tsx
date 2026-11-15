import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchApi } from "./api-client";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor";
  csrf_token: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  csrfToken: string;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const refreshMe = useCallback(async () => {
    try {
      const res = await fetchApi("/v1/admin/me");
      if (res.success && res.data) {
        setUser(res.data);
        setCsrfToken(res.data.csrf_token || "");
      } else {
        setUser(null);
        setCsrfToken("");
      }
    } catch {
      setUser(null);
      setCsrfToken("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  // Auth protection check
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname.startsWith("/admin") && pathname !== "/admin/login") {
        navigate("/admin/login");
      }
    }
  }, [user, isLoading, pathname, navigate]);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    const res = await fetchApi("/v1/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password: pass }),
    });

    setIsLoading(false);

    if (res.success && res.data) {
      const userData = {
        ...res.data.user,
        csrf_token: res.data.csrf_token,
      };
      setUser(userData);
      setCsrfToken(res.data.csrf_token);
      return { success: true };
    }

    return {
      success: false,
      error: res.error?.message || "Invalid email or password.",
    };
  };

  const logout = async () => {
    await fetchApi("/v1/admin/logout", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });
    setUser(null);
    setCsrfToken("");
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        csrfToken,
        isLoading,
        login,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}

