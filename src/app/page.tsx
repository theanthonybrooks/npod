"use client";

import { BackToTop } from "@/app/ui/components/back-to-top";
import { Navbar } from "@/app/ui/components/navbar";
import { useAppleDevice } from "@/contexts/apple-device-context";
import { cn, useIsMobile } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMotionValueEvent, useScroll } from "motion/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Test() {
  const isAppleDevice = useAppleDevice();
  const isMobile = useIsMobile();

  const [bgFade, setBgFade] = useState(false);
  const [madeFixed, setMadeFixed] = useState(false);
  const [hiddenScrollDown, setHiddenScrollDown] = useState(false);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const madeByRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 100) {
      setHiddenScrollDown(true);
    } else {
      setHiddenScrollDown(false);
    }
  });

  useGSAP(() => {
    const bg = bgRef.current;
    const made = madeByRef.current;
    if ((isAppleDevice && !bg) || !made) return;

    ScrollTrigger.create({
      trigger: made,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        setMadeFixed(true);
      },

      onEnterBack: () => {
        setMadeFixed(false);
      },
      // markers: true,
    });
    ScrollTrigger.create({
      trigger: made,
      start: "top top",
      end: "html",

      onEnter: () => {
        setBgFade(true);
      },

      onEnterBack: () => {
        setBgFade(false);
      },
      // markers: true,
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.killAll();
    };
  });

  const panelClass = "h-screen  bg-no-repeat bg-top  bg-[length:auto_100vh]";

  return (
    <>
      <div className="wrap-all">
        <Navbar />

        <div
          className={cn(
            "bg transition-opacity",
            "bg-[url('/images/5.jpg')]",
            // bgFade ? "opacity-0" : "opacity-100",
          )}
          ref={bgRef}
        />
        <main className="row-start-2 -mt-20 grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center text-center font-sans text-white/90 sm:items-start">
          <header
            // className="panel flex h-screen w-full flex-col items-start bg-[url('/images/1.jpg')] bg-[length:auto_100vh] bg-top bg-no-repeat pt-40 font-black text-white/90 uppercase"
            className={cn(
              "panel relative w-full bg-[url('/images/1.jpg')] pt-40",
              panelClass,
            )}
          >
            <div
              className={cn(
                "mx-auto flex h-full w-full max-w-[85vw] flex-col items-start justify-center text-white/90 sm:justify-start sm:pt-10",
              )}
              style={{
                fontSize: "clamp(3rem, 11vw, 14rem)",
                lineHeight: "clamp(3rem, 10vw, 12rem)",
              }}
            >
              <h1>No Point</h1>
              <h1>Of</h1>
              <h1>Departure</h1>
              <span className="font-ubuntu mt-4 block text-xl font-semibold sm:hidden">
                September 5<sup>th</sup> - 14<sup>th</sup>
              </span>
            </div>
            <button
              aria-label="Scroll to intro section"
              onClick={() => {
                const intro = document.getElementById("intro");
                if (intro) {
                  intro.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 transition-opacity",
                hiddenScrollDown && "opacity-0",
              )}
            >
              <VscChevronDown className="size-15 animate-bounce cursor-pointer text-white/90 hover:scale-110 active:scale-95" />
            </button>
          </header>

          <section
            id="intro"
            className={cn(
              "grid items-center justify-center bg-[url('/images/2.jpg')] px-10 sm:grid-cols-2",
              panelClass,
            )}
          >
            <div className="flex flex-col items-start gap-12 sm:col-start-2 sm:pr-10">
              <h2 className="text-left text-4xl font-bold">
                An exhibition on the fragile infrastructures of nourishment; how
                water, labor, and land sustain the abundance of Europe&apos;s
                food system.{" "}
              </h2>
              <span className="text-foreground flex w-full flex-col items-start rounded-4xl bg-white/90 px-6 py-3 sm:w-max">
                <p className="!font-ubuntu font-bold">Hase Studio</p>
                <p className="!font-ubuntu text-[15px] italic">
                  Weisestrasse 22, 12049, Berlin
                </p>
              </span>
            </div>
          </section>

          <section
            id="hours"
            className={cn("bg-[url('/images/3.jpg')]", panelClass)}
          >
            <div className="wrap center">
              <h2 className="lines">Section Three</h2>
              <h2 className="lines">a SMILE</h2>
            </div>
          </section>

          <section
            id="program"
            className={cn("bg-[url('/images/4.jpg')]", panelClass)}
          >
            <div className="wrap center">
              <h2 className="lines">Section Four</h2>
              <h2 className="lines">and SOME</h2>
            </div>
          </section>
          <section
            id="about"
            className={cn(
              !isAppleDevice && "bg-[url('/images/5.jpg')]",
              isAppleDevice && !bgFade && "bg-[url('/images/5.jpg')]",
              panelClass,
              madeFixed && "bg-fixed",
            )}
            ref={madeByRef}
          >
            <div className="wrap center">
              <h2 className="lines">Section Five</h2>
              <h2 className="lines">a SMILE</h2>
            </div>
          </section>

          <section id="support" className="panel">
            <div className="wrap center">
              <h2 className="lines">Section Six</h2>
              <h2 className="lines">and SOME</h2>
            </div>
          </section>

          <section id="holdstart posters" className="panel">
            <p className="last"></p>
          </section>
          <footer className="flex w-full flex-col items-center gap-4 p-4">
            <div className="text-foreground mx-auto flex w-full items-center justify-around rounded-full bg-white/90 p-4 text-sm sm:max-w-lg">
              <p>
                Made by{" "}
                <Link href="https://theanthonybrooks.com">Anthony Brooks</Link>
              </p>
              <p>
                Designed by{" "}
                <Link href="https://design.zerenoruc.com">Zeren Oruc</Link>
              </p>
            </div>
            <div className="flex items-center gap-8 text-white/90">
              <p>
                <Link href="https://zerenoruc.com/impressum">Impressum</Link>
              </p>
              <p>
                <Link href="https://zerenoruc.com/datenschutz">
                  Datenschutz
                </Link>
              </p>
            </div>
          </footer>
        </main>
        <BackToTop />
      </div>
    </>
  );
}
