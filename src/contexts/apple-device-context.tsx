"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface AppleDeviceContextValue {
  isAppleDevice: boolean;
}

export const AppleDeviceContext = createContext<
  AppleDeviceContextValue | undefined
>(undefined);

export function AppleDeviceProvider({
  isAppleDevice,
  children,
}: {
  isAppleDevice: boolean;
  children: ReactNode;
}) {
  return (
    <AppleDeviceContext.Provider value={{ isAppleDevice }}>
      {children}
    </AppleDeviceContext.Provider>
  );
}

export function useAppleDevice() {
  const ctx = useContext(AppleDeviceContext);
  if (!ctx)
    throw new Error("useAppleDevice must be used inside AppleDeviceProvider");
  return ctx.isAppleDevice;
}
