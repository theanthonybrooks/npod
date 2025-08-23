"use client";

import { BackToTop } from "@/app/ui/components/back-to-top";
import { Navbar } from "@/app/ui/components/navbar";
import { useAppleDevice } from "@/contexts/apple-device-context";
import { cn } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { AboutCard } from "@/app/ui/components/about-card";
import { Footer } from "@/app/ui/components/footer";
import { ProgramCard } from "@/app/ui/components/program-card";
import { artistInfo } from "@/data/artist-info";
import { programData } from "@/data/program-dates";
import { isBefore } from "date-fns";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const { isAppleDevice } = useAppleDevice();

  const [bgFade, setBgFade] = useState(false);
  const [madeFixed, setMadeFixed] = useState(false);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const madeByRef = useRef<HTMLDivElement | null>(null);

  // const { scrollY } = useScroll();

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

  const panelClass = "h-[100vh]  bg-no-repeat bg-top  bg-[length:auto_100vh]";

  const now = new Date();

  const sortedEvents = [...programData].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );

  const nextEvent =
    sortedEvents.find((item) => !isBefore(item.end, now)) || sortedEvents[0];

  return (
    <>
      <div className="wrap-all">
        <Navbar page="home" />

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
              "panel relative w-full bg-[url('/images/1.jpg')] pt-30 sm:pt-40",
              panelClass,
            )}
          >
            <div
              className={cn(
                "mx-auto flex h-full w-full max-w-[85vw] flex-col items-start justify-center text-white/90 sm:pt-10",
              )}
              style={{
                fontSize: "clamp(3rem, 11vw, 14rem)",
                lineHeight: "clamp(3rem, 10vw, 12rem)",
              }}
            >
              <h1>No Point</h1>
              <h1>Of</h1>
              <h1>Departure</h1>
              <span className="font-ubuntu mt-4 block text-xl font-semibold sm:text-2xl lg:hidden">
                September 5<sup>th</sup> - 14<sup>th</sup>
              </span>
            </div>
            {/* <button
              aria-label="Scroll to intro section"
              onClick={() => {
                const intro = document.getElementById("intro");
                if (intro) {
                  intro.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 transition-opacity sm:bottom-4",
                hiddenScrollDown && "opacity-0",
              )}
            >
              <VscChevronDown className="size-15 animate-bounce cursor-pointer text-white/90 hover:scale-110 active:scale-95" />
            </button> */}
          </header>

          <section
            id="intro"
            className={cn("bg-[url('/images/2.jpg')]", panelClass)}
          >
            <div
              className={cn(
                "m-auto grid h-full max-w-[85vw] items-center justify-center lg:grid-cols-2",
              )}
            >
              <div className="flex flex-col items-start gap-12 sm:col-start-2">
                <p className="font-barlow text-left text-[1.7rem] font-bold sm:text-5xl sm:leading-[1.1]">
                  An exhibition on the fragile infrastructures of nourishment;
                  how water, labor, and land sustain the abundance of
                  Europe&apos;s food system.
                </p>
                {/* TODO: add address link to google maps */}
                <span className="text-foreground flex w-full flex-col items-start rounded-4xl bg-white/90 px-6 py-4 sm:w-[350px]">
                  <p className="!font-ubuntu text-xl font-medium">
                    Hase Studio
                  </p>
                  <p className="!font-ubuntu text-[1.2rem] italic">
                    Weisestrasse 22, 12049, Berlin
                  </p>
                </span>
              </div>
              <div id="hours" />
              <div className="flex flex-col items-start gap-4 sm:col-start-1 sm:hidden sm:gap-8">
                <h2 className="font-ubuntu text-left text-4xl font-medium sm:text-6xl sm:leading-[1.1]">
                  Open Hours
                </h2>

                <span className="flex w-full flex-col items-start gap-1 text-xl font-semibold sm:gap-2 sm:text-3xl sm:font-medium">
                  <p>
                    Opening on September 5<sup>th</sup> at 7 pm
                  </p>
                  <p>Wednesday - Friday: 4 pm - 7 pm</p>
                  <p>Saturday - Sunday: 12 pm - 7 pm</p>
                </span>
              </div>
            </div>
          </section>

          <section className={cn("bg-[url('/images/3.jpg')]", panelClass)}>
            <div
              className={cn(
                "lg:justify-items m-auto flex h-full max-w-[85vw] flex-col content-between items-start justify-between lg:grid lg:grid-cols-2 lg:grid-rows-1",
              )}
            >
              <div className="hidden h-full flex-col items-start gap-4 sm:col-start-1 sm:flex sm:gap-8">
                <h2 className="font-ubuntu text-left text-4xl font-medium sm:text-6xl sm:leading-[1.1]">
                  Open Hours
                </h2>

                <span className="flex w-full flex-col items-start gap-1 text-xl font-semibold sm:gap-2 sm:text-3xl sm:font-medium">
                  <p>
                    Opening on September 5<sup>th</sup> at 7 pm
                  </p>
                  <p>Wednesday - Friday: 4 pm - 7 pm</p>
                  <p>Saturday - Sunday: 12 pm - 7 pm</p>
                </span>
              </div>
              <div className="flex h-full flex-1 flex-col justify-end gap-8 sm:items-center">
                <div id="program" />
                {/* TODO: Add appropriate event depending on the current date and what has passed. */}
                <h2 className="font-ubuntu w-full text-start text-4xl font-medium text-white/90 sm:text-6xl sm:leading-[1.1] lg:text-center">
                  Program
                </h2>

                <div className="item-center flex w-full flex-col gap-6">
                  {nextEvent &&
                    (() => {
                      return (
                        <ProgramCard
                          title={nextEvent.title}
                          start={nextEvent.start}
                          end={nextEvent.end}
                          description={nextEvent.description}
                          shouldDisplayTime
                        />
                      );
                    })()}

                  <Link href="/program" className="text-xl font-medium">
                    View full program
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section
            id="about"
            className={cn("bg-[url('/images/4.jpg')]", panelClass)}
          >
            <div
              className={cn(
                "m-auto flex h-full max-w-[85vw] flex-col items-center justify-center gap-12",
              )}
            >
              <h2 className="font-ubuntu text-left text-4xl font-medium sm:text-6xl sm:leading-[1.1]">
                This exhibition is made by
              </h2>
              <div
                className={cn(
                  "flex flex-col justify-between gap-8 md:flex-row",
                )}
              >
                {artistInfo.map((artist) => (
                  <AboutCard
                    key={artist.name}
                    name={artist.name}
                    description={artist.description}
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            id="support"
            className={cn(
              !isAppleDevice && "bg-[url('/images/5.jpg')]",
              isAppleDevice && !bgFade && "bg-[url('/images/5.jpg')]",
              panelClass,
              madeFixed && "bg-fixed",
            )}
            ref={madeByRef}
          >
            <div className=" ">
              <h2 className="lines">Section Five</h2>
              <h2 className="lines">a SMILE</h2>
            </div>
          </section>

          <section id="holdstart posters" className="panel">
            <p className="last"></p>
          </section>
          <Footer />
        </main>
        <BackToTop />
      </div>
    </>
  );
}
