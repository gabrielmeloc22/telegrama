"use client";

import { AuthProvider } from "@/components/auth";
import RelayEnvironment from "@/relay/relay-environment";
import { Spinner } from "@ui/components";
import { Suspense } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return (
    <RelayEnvironment>
      <Suspense fallback={<Spinner />}>
        <AuthProvider>{children}</AuthProvider>
      </Suspense>
    </RelayEnvironment>
  );
}
