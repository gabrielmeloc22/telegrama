"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { Login } from "./login";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [client, setClient] = useState(false);
  const me = useUser();

  // avoid hydration errors
  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }

  return !me ? <Login /> : children;
}
