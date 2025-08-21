"use client";

import { Navbar } from "@/app/ui/components/navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const bgRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  useGSAP(() => {
    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".start-trig",
    //     pin: ".bg-container",
    //     pinSpacing: false,
    //     start: "top top",
    //     onToggle: ({ isActive }) => {
    //       console.log(isActive);
    //     },
    //     onUpdate: () => {
    //       console.log("update");
    //     },
    //     endTrigger: "#triggerEnd",
    //     end: "bottom bottom",
    //     markers: true,
    //   },
    // });
    ScrollTrigger.create({
      trigger: startRef.current,
      pin: bgRef.current,
      pinSpacing: false,
      start: "bottom bottom",
      onToggle: ({ isActive }) => {
        console.log(isActive);
      },
      onUpdate: () => {
        console.log("update");
      },
      endTrigger: endRef.current,
      end: "bottom bottom",
      markers: true,
    });
  });

  return (
    <>
      <div className="wrap-all">
        <Navbar />
        <div ref={bgRef} className="bg-container bg" />
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-16 p-4 pb-20 font-sans">
          <main className="row-start-2 flex flex-col items-center gap-[32px] text-center text-white/80 sm:items-start">
            <header
              className="flex flex-col items-start font-black uppercase"
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
              ref={startRef}
              className="start-trig h-screen w-full border-b text-center"
            >
              3
            </section>
            <section className="h-screen w-full border-b text-center">
              1
            </section>
            <section className="h-screen w-full border-b text-center">
              2
            </section>
            <section className="h-screen w-full border-b text-center">
              4
            </section>
            <section className="h-screen w-full border-b border-red-400 text-center">
              5
            </section>
          </main>
          <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
            <p>
              Made by{" "}
              <Link href="https://theanthonybrooks.com">Anthony Brooks</Link>
            </p>
            <p>
              Designed by{" "}
              <Link href="https://design.zerenoruc.com">Zeren Oruc</Link>
            </p>
          </footer>
          <div className="triggerEnd last" ref={endRef} />
        </div>
        <img src="/images/1.jpg" alt="1" />
        <img src="/images/2.jpg" alt="2" />
        <img src="/images/3.jpg" alt="3" />
        <img src="/images/4.jpg" alt="4" />
        <img src="/images/5.jpg" alt="5" />
      </div>
    </>
  );
}
