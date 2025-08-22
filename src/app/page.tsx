"use client";

import { Navbar } from "@/app/ui/components/navbar";
import { useAppleDevice } from "@/contexts/apple-device-context";
import { cn } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Test() {
  const isAppleDevice = useAppleDevice();
  console.log(isAppleDevice);
  const [bgFade, setBgFade] = useState(false);
  console.log("bg fade", bgFade);
  const [madeFixed, setMadeFixed] = useState(false);
  // const startRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const madeByRef = useRef<HTMLDivElement | null>(null);
  //   useGSAP(() => {
  //     // gsap.timeline({
  //     //   scrollTrigger: {
  //     //     trigger: ".start-trig",
  //     //     pin: ".bg-container",
  //     //     pinSpacing: false,
  //     //     start: "top top",
  //     //     onToggle: ({ isActive }) => {
  //     //       console.log(isActive);
  //     //     },
  //     //     onUpdate: () => {
  //     //       console.log("update");
  //     //     },
  //     //     endTrigger: "#triggerEnd",
  //     //     end: "bottom bottom",
  //     //     markers: true,
  //     //   },
  //     // });
  //     ScrollTrigger.create({
  //       trigger: startRef.current,
  //       pin: bgRef.current,
  //       pinSpacing: false,
  //       start: "top top",
  //       onToggle: ({ isActive }) => {
  //         console.log(isActive);
  //       },
  //       onUpdate: () => {
  //         console.log("update");
  //       },
  //       endTrigger: endRef.current,
  //       end: "top top",
  //       markers: true,
  //       invalidateOnRefresh: true,
  //     });
  //   });

  useGSAP(() => {
    const bg = bgRef.current;
    const made = madeByRef.current;
    if ((isAppleDevice && !bg) || !made) return;

    ScrollTrigger.create({
      trigger: made,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        // console.log("onEnter");
        // madeByRef.current?.classList.add("bg-fixed");
        setMadeFixed(true);
      },

      onEnterBack: () => {
        // console.log("onEnterBack");
        // madeByRef.current?.classList.remove("bg-fixed");
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
      markers: true,
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
            // bgFade ? "opacity-0" : "opacity-100",
          )}
          ref={bgRef}
        />
        <main className="row-start-2 -mt-20 grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center text-center font-sans text-white/90 sm:items-start">
          <header
            // className="panel flex h-screen w-full flex-col items-start bg-[url('/images/1.jpg')] bg-[length:auto_100vh] bg-top bg-no-repeat pt-40 font-black text-white/90 uppercase"
            className={cn(
              "panel flex w-full flex-col items-start bg-[url('/images/1.jpg')] pt-40 font-black text-white/90 uppercase",
              panelClass,
            )}
            style={{
              fontSize: "clamp(2rem, 10vw, 12rem)",
              lineHeight: "clamp(2rem, 10vw, 7rem)",
            }}
          >
            <p>No Point</p>
            <p>Of</p>
            <p>Departure</p>
            <span className="mt-4 block text-lg sm:hidden">
              September 5<sup>th</sup> - 14<sup>th</sup>
            </span>
          </header>

          <section
            id="intro"
            className={cn("bg-[url('/images/2.jpg')]", panelClass)}
          >
            <div className="wrap center">
              <h2 className="lines">Section Two</h2>
              <h2 className="lines">AND.</h2>
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
            id="madeby"
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
                <Link href="https://design.zerenoruc.com">Impressum</Link>
              </p>
              <p>
                <Link href="https://theanthonybrooks.com">Datenschutz</Link>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
