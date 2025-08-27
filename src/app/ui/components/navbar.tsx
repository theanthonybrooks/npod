"use client";
import { cn, useIsMobile } from "@/utils/utils";

import Link from "next/link";
import { PiMapPinAreaFill } from "react-icons/pi";

import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { Variants } from "motion";
import { useState } from "react";

interface NavbarProps {
  className?: string;
  page: "home" | "program";
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

const navBarLinks = [
  { href: "/", text: "Home", mobile: true, desktop: true, page: "program" },
  {
    href: "/#hours",
    text: "Open Hours",
    mobile: false,
    desktop: true,
    page: "all",
  },
  {
    href: "/#openhours",
    text: "Open Hours",
    mobile: true,
    desktop: false,
    page: "all",
  },

  {
    href: "/#program",
    text: "Program",
    mobile: true,
    desktop: true,
    page: "home",
  },
  {
    href: "/#collaborators",
    text: "Collaborators",
    mobile: false,
    desktop: true,
    page: "all",
  },
  {
    href: "/#prints",
    text: "Prints",
    mobile: false,
    desktop: true,
    page: "all",
  },
];

export const Navbar = ({ className, page }: NavbarProps) => {
  const isMobile = useIsMobile();
  const programPage = page === "program";
  const homePage = page === "home";
  const { scrollY, scrollYProgress } = useScroll();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [navTrigger, setNavTrigger] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 100 && isMobile) {
      setNavTrigger(true);
    } else {
      setNavTrigger(false);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (programPage) return;
    if (isMobile) {
      if (latest >= 0.2 && latest < 0.3) {
        setActiveId("openhours");
      } else if (latest >= 0.3 && latest < 0.4) {
        setActiveId("program");
      } else {
        setActiveId(null);
      }
    } else {
      if (latest >= 0.2 && latest < 0.5) {
        setActiveId("hours");
      } else if (latest >= 0.5 && latest < 0.6) {
        setActiveId("program");
      } else if (latest >= 0.6 && latest < 0.9) {
        setActiveId("collaborators");
      } else if (latest >= 0.9) {
        setActiveId("prints");
      } else {
        setActiveId(null);
      }
    }
  });

  const activeLinkClass = cn("underline underline-offset-4");

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
        <Link href="https://maps.app.goo.gl/enh2Jm1Z48Krz1VAA" target="_blank">
          <PiMapPinAreaFill
            className={cn(
              "text-foreground size-8 hover:text-[#325bf0]",
              // isMobile && "absolute left-4 top-4"
            )}
          />
        </Link>
        <span className="hidden lg:block">
          September 5<sup>th</sup> - 14<sup>th</sup>
        </span>
      </div>

      <div className="flex items-center gap-x-10">
        {navBarLinks
          .filter((link) => link.page === "all" || link.page === page)
          .map((link) => {
            const linkId = link.href.startsWith("/#")
              ? link.href.slice(2)
              : null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "decoration-2 hover:underline hover:underline-offset-4 active:underline-offset-2",
                  !link.mobile && "hidden sm:block",
                  !link.desktop && "sm:hidden",
                  activeId === linkId?.toLowerCase() && activeLinkClass,
                )}
              >
                {link.text}
              </Link>
            );
          })}
      </div>
    </motion.div>
  );
};
