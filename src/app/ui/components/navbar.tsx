"use client";
import { cn, useIsMobile } from "@/utils/utils";

import Link from "next/link";
import { FaRegCompass } from "react-icons/fa";

import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { Variants } from "motion";
import { useState } from "react";

interface NavbarProps {
  className?: string;
  page?: "home" | "program";
}
const navbarVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
  },
  desktop: {
    opacity: 1,
    y: 0,
  },
};

export const Navbar = ({ className, page }: NavbarProps) => {
  const isMobile = useIsMobile();
  const programPage = page === "program";
  const homePage = page === "home";
  const { scrollY } = useScroll();
  const [navTrigger, setNavTrigger] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 100 && isMobile) {
      setNavTrigger(true);
    } else {
      setNavTrigger(false);
    }
  });

  return (
    <motion.div
      animate={
        isMobile && page !== "program"
          ? navTrigger
            ? "enter"
            : "exit"
          : "desktop"
      }
      variants={navbarVariants}
      className={cn(
        "text-foreground font-ubuntu sticky top-6 z-50 mx-auto flex h-14 w-full max-w-[85vw] items-center justify-between rounded-full bg-white/90 px-6 pr-10 font-medium sm:max-w-[84vw] sm:py-4",
        isMobile && "gap-y-1",
        className,
        programPage && "px-6",
      )}
    >
      <div className="flex items-center gap-x-10">
        <FaRegCompass
          className={cn(
            "text-foreground size-8",
            // isMobile && "absolute left-4 top-4"
          )}
        />
        <span className="hidden lg:block">
          September 5<sup>th</sup> - 14<sup>th</sup>
        </span>
      </div>
      <div className="flex items-center gap-x-10">
        <>
          <Link href="/#hours">Open Hours</Link>
          {!programPage && <Link href="/program">Program</Link>}
          <Link href="/#about" className="hidden sm:block">
            About
          </Link>
          <Link href="/#support" className="hidden sm:block">
            Prints
          </Link>
        </>
        {programPage && <Link href="/">Home</Link>}
      </div>
    </motion.div>
  );
};
