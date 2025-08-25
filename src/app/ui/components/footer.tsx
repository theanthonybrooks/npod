import { cn } from "@/utils/utils";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mx-auto flex w-full max-w-[85vw] flex-col items-center gap-4 py-4">
      <div className="text-foreground mx-auto flex w-full max-w-max items-center justify-center gap-1 gap-x-6 rounded-full bg-white/90 p-3 px-4 text-xs text-nowrap sm:flex-row sm:gap-x-12 sm:px-10 sm:py-2.5 sm:text-sm">
        <p className={cn("!font-ubuntu")}>
          Made by{" "}
          <Link
            href="https://theanthonybrooks.com"
            className={cn(
              "hover:underline hover:underline-offset-4 active:underline-offset-2",
            )}
          >
            Anthony Brooks
          </Link>
        </p>
        <p className={cn("!font-ubuntu")}>
          Designed by{" "}
          <Link
            href="https://design.zerenoruc.com"
            className={cn(
              "hover:underline hover:underline-offset-4 active:underline-offset-2",
            )}
          >
            Zeren Oruc
          </Link>
        </p>
      </div>
      <div className="flex items-center gap-8 text-xs text-white/90 sm:text-sm">
        <p className={cn("!font-ubuntu")}>
          <Link href="https://zerenoruc.com/impressum">Impressum</Link>
        </p>
        <p className={cn("!font-ubuntu")}>
          <Link href="https://zerenoruc.com/datenschutz">Datenschutz</Link>
        </p>
      </div>
    </footer>
  );
};
