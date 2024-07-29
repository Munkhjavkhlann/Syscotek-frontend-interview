import { useEffect, useState } from "react";
import { useStore, useInitializeStore } from "../store/store"; // Adjust the import based on your actual hook location

export const useAuth = () => {
  const { user, logout } = useStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  const [isLoading, setIsLoading] = useState(true);

  useInitializeStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return { user, isLoading, logout };
};
