"use client";
import { cn, useIsMobile } from "@/utils/utils";

import Link from "next/link";
import { FaRegCompass } from "react-icons/fa";

interface NavbarProps {
  className?: string;
}
// const navbarVariants: Variants = {
//   initial: {
//     opacity: 0,
//     y: -100,
//   },
//   enter: {
//     opacity: 1,
//     y: 0,
//   },
//   exit: {
//     opacity: 0,
//     y: -100,
//   },
//   desktop: {
//     opacity: 1,
//     y: 0,
//   },
// };

export const Navbar = ({ className }: NavbarProps) => {
  const isMobile = useIsMobile();

  //   const { scrollY } = useScroll();
  //   const [navTrigger, setNavTrigger] = useState(false);

  //   //   useMotionValueEvent(scrollY, "change", (latest) => {
  //   //     if (latest >= 100 && isMobile) {
  //   //       setNavTrigger(true)
  //   //     } else {
  //   //       setNavTrigger(false)
  //   //     }
  //   //   })

  //   console.log(navTrigger);
  return (
    <div
      className={cn(
        "text-foreground sticky top-6 z-50 mx-auto flex h-14 w-full max-w-[90vw] items-center justify-around rounded-full bg-white/90 px-4 font-medium sm:max-w-[95vw] sm:justify-between sm:px-20 sm:py-4",
        isMobile && "gap-y-1",
        className,
      )}
    >
      <div className="flex items-center gap-x-10">
        <FaRegCompass
          className={cn(
            "text-foreground size-8",
            // isMobile && "absolute left-4 top-4"
          )}
        />
        <span className="hidden sm:block">
          September 5<sup>th</sup> - 14<sup>th</sup>
        </span>
      </div>
      <div className="flex items-center gap-x-10 font-semibold sm:font-medium">
        <Link href="/test">Open Hours</Link>
        <Link href="#program">Program</Link>
      </div>
    </div>
  );
};
