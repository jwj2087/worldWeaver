"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
};

type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

type AuthContextValue = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  user: AuthUser | null;
};

const ACCESS_TOKEN_KEY = "worldweaver.accessToken";
const USER_KEY = "worldweaver.user";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const PUBLIC_PATHS = new Set(["/", "/login", "/signup"]);

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredUser() {
  try {
    const storedUser = window.localStorage.getItem(USER_KEY);
    return storedUser ? (JSON.parse(storedUser) as AuthUser) : null;
  } catch {
    return null;
  }
}

async function parseAuthResponse(response: Response) {
  if (!response.ok) {
    const fallbackMessage = "요청을 처리하지 못했습니다.";
    try {
      const body = (await response.json()) as { message?: string; error?: string };
      throw new Error(body.message ?? body.error ?? fallbackMessage);
    } catch (error) {
      if (error instanceof Error && error.message !== fallbackMessage) {
        throw error;
      }
      throw new Error(fallbackMessage);
    }
  }

  return (await response.json()) as AuthResponse;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveSession = useCallback((session: AuthResponse) => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setAccessToken(session.accessToken);
    setUser(session.user);
  }, []);

  const clearSession = useCallback(() => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setAccessToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const storedToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
      const storedUser = getStoredUser();

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(storedUser);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          credentials: "include",
          method: "POST",
        });
        const session = await parseAuthResponse(response);

        if (isMounted) {
          saveSession(session);
        }
      } catch {
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [clearSession, saveSession]);

  useEffect(() => {
    if (isLoading || PUBLIC_PATHS.has(pathname)) {
      return;
    }

    if (!accessToken) {
      const next = pathname + (searchParams.size ? `?${searchParams.toString()}` : "");
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [accessToken, isLoading, pathname, router, searchParams]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const session = await parseAuthResponse(response);
      saveSession(session);
    },
    [saveSession],
  );

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: "include",
        method: "POST",
      });
    } finally {
      clearSession();
      router.replace("/login");
    }
  }, [clearSession, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isAuthenticated: Boolean(accessToken),
      isLoading,
      login,
      logout,
      user,
    }),
    [accessToken, isLoading, login, logout, user],
  );

  const shouldHoldProtectedPage = isLoading || (!accessToken && !PUBLIC_PATHS.has(pathname));

  return (
    <AuthContext.Provider value={value}>
      {shouldHoldProtectedPage ? (
        <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] text-sm text-stone-500">
          WorldWeaver 불러오는 중...
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
