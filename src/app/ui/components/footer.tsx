import { cn } from "@/utils/utils";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mx-auto flex w-full max-w-[85vw] flex-col items-center gap-4 py-4">
      <div className="text-foreground mx-auto flex w-full flex-col-reverse items-center justify-around gap-1 gap-x-8 rounded-full bg-white/90 p-3 text-sm sm:max-w-max sm:flex-row sm:p-4 sm:px-8">
        <p className={cn("!font-ubuntu")}>
          Made by{" "}
          <Link href="https://theanthonybrooks.com">Anthony Brooks</Link>
        </p>
        <p className={cn("!font-ubuntu")}>
          Designed by{" "}
          <Link href="https://design.zerenoruc.com">Zeren Oruc</Link>
        </p>
      </div>
      <div className="flex items-center gap-8 text-white/90">
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
