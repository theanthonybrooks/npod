"use client";

import { BackToTop } from "@/app/ui/components/back-to-top";
import { Navbar } from "@/app/ui/components/navbar";
import { cn } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Program() {
  const panelClass =
    "h-full  bg-no-repeat bg-top bg-[length:auto] sm:bg-[length:100dvw_auto] ";

  return (
    <>
      <div
        className={cn("bg-[url('/images/backg_large_longer.jpg')]", panelClass)}
      >
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
                <div className="flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 sm:px-14">
                  <p className="font-barlow text-2xl font-semibold">
                    Reading Landscapes from Above: Maps, Satellites, and
                    Visualizations
                  </p>
                  <p className="font-medium italic">September 6th, 4 - 6 pm</p>
                  <p className="text-start font-medium">
                    A guided exploration on how landscapes are represented
                    through data and satellite images. Taking examples from
                    Sentinel visualizations of Almería, we&apos;ll explore how
                    mapping reveals ecological stress and human impact, while
                    also questioning the limits of Western gaze on geography.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 sm:px-14">
                  <p className="font-barlow text-2xl font-semibold">
                    Making Elsewhere: Art in Unfamiliar Geographies
                  </p>
                  <p className="font-medium italic">September 7th, 3 - 5 pm</p>
                  <p className="text-start font-medium">
                    An artist talk with Isabel Law and Martin Karl Kufeita on
                    producing work in new contexts, from residencies to
                    fieldwork. The conversation reflects on how place, distance,
                    and lived experience shape artistic practice.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 sm:px-14">
                  <p className="font-barlow text-2xl font-semibold">
                    Figurations: Memory, Myth, and Food
                  </p>
                  <p className="font-medium italic">September 13th, 5 - 7 pm</p>
                  <p className="text-start font-medium">
                    The fig trees carry many meanings across cultures, from
                    religious symbol to everyday fruit, but beyond their
                    familiar symbolism in Europe, figs also hold diverse
                    identities and stories elsewhere. In this conversation,
                    Isabel Law and Zeren Oruc explore the fig as motif in the
                    exhibition, tracing its layered histories, overlooked
                    varieties, and personal resonances, followed by a fig-based
                    offering by Martin Karl Kufeita.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 sm:px-14">
                  <p className="font-barlow text-2xl font-semibold">
                    Finissage: with Curatial Walkthrough
                  </p>
                  <p className="font-medium italic">September 14th, 5 - 7 pm</p>
                  <p className="text-start font-medium">
                    To close the exhibition, we gather for a final evening of
                    conversation and reflection. Through a curatorial walk, we
                    will unfold the connections between water, food, and care
                    across the works.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 sm:px-14">
                  <p className="font-barlow text-2xl font-semibold">
                    Reading Landscapes from Above: Maps, Satellites, and
                    Visualizations
                  </p>
                  <p className="font-medium italic">September 6th, 4 - 6 pm</p>
                  <p className="text-start font-medium">
                    A guided exploration on how landscapes are represented
                    through data and satellite images. Taking examples from
                    Sentinel visualizations of Almería, we&apos;ll explore how
                    mapping reveals ecological stress and human impact, while
                    also questioning the limits of Western gaze on geography.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 sm:px-14">
                  <p className="font-barlow text-2xl font-semibold">
                    Reading Landscapes from Above: Maps, Satellites, and
                    Visualizations
                  </p>
                  <p className="font-medium italic">September 6th, 4 - 6 pm</p>
                  <p className="text-start font-medium">
                    A guided exploration on how landscapes are represented
                    through data and satellite images. Taking examples from
                    Sentinel visualizations of Almería, we&apos;ll explore how
                    mapping reveals ecological stress and human impact, while
                    also questioning the limits of Western gaze on geography.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <Link href="https://zerenoruc.com/datenschutz">Datenschutz</Link>
            </p>
          </div>
        </footer>

        <BackToTop />
      </div>
    </>
  );
}
