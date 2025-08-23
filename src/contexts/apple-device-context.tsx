"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface AppleDeviceContextValue {
  isAppleDevice: boolean;
  isIOS: boolean;
  isMacSafari: boolean;
  uaVal: string;
}

export const AppleDeviceContext = createContext<
  AppleDeviceContextValue | undefined
>(undefined);

export function AppleDeviceProvider({
  isAppleDevice,
  isIOS,
  isMacSafari,
  uaVal,
  children,
}: {
  isAppleDevice: boolean;
  isIOS: boolean;
  isMacSafari: boolean;
  uaVal: string;
  children: ReactNode;
}) {
  return (
    <AppleDeviceContext.Provider
      value={{ isAppleDevice, isIOS, isMacSafari, uaVal }}
    >
      {children}
    </AppleDeviceContext.Provider>
  );
}

export function useAppleDevice() {
  const ctx = useContext(AppleDeviceContext);
  if (!ctx)
    throw new Error("useAppleDevice must be used inside AppleDeviceProvider");
  return ctx;
}
