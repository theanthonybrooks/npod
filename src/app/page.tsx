"use client";

import { Navbar } from "@/app/ui/components/navbar";
import { useAppleDevice } from "@/contexts/apple-device-context";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Test() {
  const isAppleDevice = useAppleDevice();
  console.log(isAppleDevice);

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
    if (!madeByRef.current) return;

    ScrollTrigger.create({
      trigger: madeByRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        // console.log("onEnter");
        madeByRef.current?.classList.add("bg-fixed");
      },

      onEnterBack: () => {
        // console.log("onEnterBack");
        madeByRef.current?.classList.remove("bg-fixed");
      },
      markers: true,
    });
    ScrollTrigger.create({
      trigger: madeByRef.current,
      start: "top-100px top",
      end: "html",
      onEnter: () => {
        // console.log("onEnter");
        bgRef.current?.classList.add("fixed");
      },

      onEnterBack: () => {
        // console.log("onEnterBack");
        bgRef.current?.classList.remove("fixed");
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

  return (
    <>
      <div className="wrap-all">
        <Navbar />
        <div className="bg" ref={bgRef}></div>
        <main className="row-start-2 -mt-20 grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center text-center font-sans text-white/90 sm:items-start">
          <header
            className="panel flex w-full flex-col items-start pt-40 font-black text-white/90 uppercase"
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

          <section id="intro" className="panel">
            <div className="wrap center">
              <h2 className="lines">Section Two</h2>
              <h2 className="lines">AND.</h2>
            </div>
          </section>

          <section id="hours" className="panel">
            <div className="wrap center">
              <h2 className="lines">Section Three</h2>
              <h2 className="lines">a SMILE</h2>
            </div>
          </section>

          <section id="program" className="panel">
            <div className="wrap center">
              <h2 className="lines">Section Four</h2>
              <h2 className="lines">and SOME</h2>
            </div>
          </section>
          <section id="madeby" className="panel" ref={madeByRef}>
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
