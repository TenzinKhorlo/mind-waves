// contexts/EnokiWrapper.tsx
"use client";

import { EnokiFlowProvider } from "@mysten/enoki/react";
import { UserProvider } from "./UserContext";

const ENOKI_API_KEY = process.env.NEXT_PUBLIC_ENOKI_API_KEY!;

export default function EnokiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <EnokiFlowProvider apiKey={ENOKI_API_KEY}>
      <UserProvider>{children}</UserProvider>
    </EnokiFlowProvider>
  );
}
