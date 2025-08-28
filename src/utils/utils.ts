import { clsx, type ClassValue } from "clsx";
import * as React from "react";
import sanitizeHtml from "sanitize-html";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setParamIfNotDefault = <T>(
  params: URLSearchParams,
  key: string,
  value: T,
  defaultValue: T,
) => {
  if (value === defaultValue) {
    params.delete(key);
  } else {
    params.set(key, String(value));
  }
};

export function arraysShareValue<T>(arr1: T[], arr2: T[]): boolean {
  const set1 = new Set(arr1);
  return arr2.some((item) => set1.has(item));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1536;
const XL_DESKTOP_BREAKPOINT = 2400;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const onChange = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isDesktop;
}

export function useIsXLDesktop() {
  const [isXLDesktop, setIsXLDesktop] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${XL_DESKTOP_BREAKPOINT}px)`);
    const onChange = () => {
      setIsXLDesktop(window.innerWidth >= XL_DESKTOP_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsXLDesktop(window.innerWidth >= XL_DESKTOP_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isXLDesktop;
}

export const sanitizeInput = (value: string) => {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
};

export function cleanInput(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}
