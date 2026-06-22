"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function apiPath(path) {
  if (!API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL in your environment.");
  }

  return `${API_URL.replace(/\/$/, "")}${path}`;
}

async function readJson(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function errorMessage(data, fallback) {
  return data?.message || data?.error || fallback;
}

async function request(path, options = {}) {
  const response = await fetch(apiPath(path), {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await readJson(response);

  if (!response.ok) {
    throw new Error(errorMessage(data, "Request failed. Please try again."));
  }

  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentUser = await request("/me", { method: "GET" });
    setUser(currentUser);
    return currentUser;
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      try {
        const currentUser = await request("/me", { method: "GET" });

        if (!ignore) {
          setUser(currentUser);
        }
      } catch {
        if (!ignore) {
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      ignore = true;
    };
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      await request("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      return refreshUser();
    },
    [refreshUser],
  );

  const signup = useCallback(
    async ({ name, email, password }) => {
      await request("/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      await request("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      return refreshUser();
    },
    [refreshUser],
  );

  const logout = useCallback(async () => {
    await request("/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, loading, login, signup, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
