import { useEffect } from "react";
import { create } from "zustand";

interface UserState {
  user: { id: string; email: string } | null;
  token: string | null;
  setUser: (
    user: { id: string; email: string } | null,
    token: string | null
  ) => void;
  logout: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    set({ user, token });
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", token || "");
    }
  },
  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }
  },
}));

export const useInitializeStore = () => {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("authToken");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser), storedToken);
      }
    }
  }, [setUser]);
};
