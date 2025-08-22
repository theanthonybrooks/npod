"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const [backToTop, setBackToTop] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.1) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  });
  if (!backToTop) return;
  return (
    <div className="fixed right-4 bottom-4 rounded-full bg-white/90 p-2 text-sm shadow-lg">
      Back to Top
    </div>
  );
};
