"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

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
  const onGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <div
      className="fixed right-4 bottom-4 cursor-pointer rounded-full bg-white/90 p-2 text-sm shadow-lg hover:scale-110 active:scale-95"
      onClick={onGoToTop}
    >
      <FaArrowUp className="size-5" />
    </div>
  );
};
