"use client";

import { BackToTop } from "@/app/ui/components/back-to-top";
import { Footer } from "@/app/ui/components/footer";
import { Navbar } from "@/app/ui/components/navbar";
import { ProgramCard } from "@/app/ui/components/program-card";
import { useAppleDevice } from "@/contexts/apple-device-context";
import { programData } from "@/data/program-dates";
import { cn } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Program() {
  const { isIOS, uaVal, isAppleDevice } = useAppleDevice();
  console.log(isIOS, uaVal, isAppleDevice);
  const panelClass =
    "h-full  bg-no-repeat bg-top bg-[length:auto] sm:bg-[length:100vw_auto] ";
  const appleClass = !isIOS && "bg-fixed";
  const sortedEvents = [...programData].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
  return (
    <>
      <div className={cn("relative", panelClass, appleClass)}>
        <div
          className={cn(
            "fixed -z-10 h-screen w-screen bg-[url('/images/mini_bg.jpg')]",
            panelClass,
          )}
        />

        <Navbar page="program" />

        <div id="program" className={cn("py-10")}>
          <div
            className={cn(
              "m-auto flex h-full max-w-[85vw] items-center justify-center pt-20",
            )}
          >
            <div className="flex flex-col items-center gap-8">
              <h2 className="font-ubuntu text-left text-4xl font-medium text-white/90 sm:text-6xl sm:leading-[1.1]">
                Program
              </h2>

              <div className="text-foreground flex w-full flex-col items-start gap-6">
                {sortedEvents.map((item, index) => {
                  return (
                    <ProgramCard
                      title={item.title}
                      start={item.start}
                      end={item.end}
                      description={item.description}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Footer />

        <BackToTop />
      </div>
    </>
  );
}
