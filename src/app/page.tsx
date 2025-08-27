"use client";

import { BackToTop } from "@/app/ui/components/back-to-top";
import { Navbar } from "@/app/ui/components/navbar";
import { useAppleDevice } from "@/contexts/apple-device-context";
import { cn, useIsDesktop } from "@/utils/utils";
import { useGSAP } from "@gsap/react";
import { EmblaOptionsType } from "embla-carousel";
import { gsap } from "gsap";

import { sendEmail } from "@/app/actions/sendEmail";
import {
  EmblaCarousel,
  ImgCarousel,
} from "@/app/ui/components/carousel/carousel";
import { Footer } from "@/app/ui/components/footer";
import { Input } from "@/app/ui/components/input";
import { ProgramCard } from "@/app/ui/components/program-card";
import { SelectSimple } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { artistInfo } from "@/data/artist-info";
import { posterData } from "@/data/img-data";
import { programData } from "@/data/program-dates";
import { isBefore } from "date-fns";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { LuLoader } from "react-icons/lu";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const isDesktop = useIsDesktop();
  const { isAppleDevice } = useAppleDevice();
  const formRef = useRef<HTMLFormElement>(null);

  const [bgFade, setBgFade] = useState(false);
  const [madeFixed, setMadeFixed] = useState(false);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const madeByRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [poster, setPoster] = useState("");
  const isValidForm = Boolean(isValidEmail(email) && poster && name);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [submitCounter, setSubmitCounter] = useState(0);

  const handleReset = () => {
    setName("");
    setEmail("");

    setPoster("");
    setError("");
    setPending(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitCounter((prev) => prev + 1);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const combinedData = {
      name: data.name as string,
      email: data.email as string,
      poster,
      message: (data.message as string) || "",
    };

    setPending(true);
    const result = await sendEmail({
      name: combinedData.name,
      email: combinedData.email,
      poster: combinedData.poster,
      message: combinedData.message,
    });

    if (!result.success) {
      setError(result.error || "Something went wrong");
      return;
    }

    handleReset();
    formRef.current?.reset();
  };

  useGSAP(() => {
    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll("h1");
      const date = titleRef.current.querySelector("span");

      gsap.set([...lines, date], { y: 100, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(lines, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.3,
      });

      if (date) {
        tl.to(
          date,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
          },
          "+=0.1",
        );
      }
    }

    if (introRef.current) {
      const text = introRef.current.querySelector("p");
      const card = introRef.current.querySelector("a");

      gsap.set([text, card], { y: 50, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 30%",
          },
        })
        .to(text, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        })
        .to(
          card,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        );
    }

    const bg = bgRef.current;
    const made = madeByRef.current;
    if (made && (!isAppleDevice || bg)) {
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
    }

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

  const OPTIONS: EmblaOptionsType = {
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
    watchDrag: isDesktop ? false : true,
  };

  return (
    <>
      <div className="wrap-all">
        <Navbar page="home" />

        <div
          className={cn(
            "bg transition-opacity",
            "bg-[url('/images/4.jpg')]",
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
              ref={titleRef}
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
            // id="intro"
            className={cn("bg-[url('/images/2.jpg')]", panelClass)}
          >
            <div
              ref={introRef}
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
                <Link
                  href="https://maps.app.goo.gl/enh2Jm1Z48Krz1VAA"
                  target="_blank"
                  className="text-foreground flex w-full cursor-pointer flex-col items-start rounded-4xl bg-white/90 px-6 py-4 sm:w-[350px]"
                >
                  <p className="!font-ubuntu text-xl font-medium">
                    Hase Studio
                  </p>
                  <p className="!font-ubuntu text-[1.2rem] italic">
                    Weisestrasse 22, 12049, Berlin
                  </p>
                </Link>
              </div>

              <div className="flex flex-col items-start gap-4 sm:col-start-1 sm:hidden sm:gap-8">
                <h2
                  id="openhours"
                  className="font-ubuntu text-left text-4xl font-medium sm:text-6xl sm:leading-[1.1]"
                >
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
                <h2
                  id="hours"
                  className="font-ubuntu text-left text-4xl font-medium sm:text-6xl sm:leading-[1.1]"
                >
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

                  <Link
                    href="/program"
                    className="text-xl font-medium hover:underline hover:underline-offset-4 active:underline-offset-2"
                  >
                    View full program
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section
            // className={cn("bg-[url('/images/4.jpg')]", panelClass)}
            className={cn(
              !isAppleDevice && "bg-[url('/images/4.jpg')]",
              isAppleDevice && !bgFade && "bg-[url('/images/4.jpg')]",
              panelClass,
              madeFixed && "bg-fixed",
            )}
            ref={madeByRef}
          >
            <div
              className={cn(
                "m-auto flex h-full flex-col items-center justify-end gap-12",
              )}
            >
              <h2
                id="collaborators"
                className="font-ubuntu text-left text-4xl font-medium sm:text-6xl sm:leading-[1.1]"
              >
                Collaborators
              </h2>
              <div className={cn("w-full")}>
                <EmblaCarousel slides={artistInfo} options={OPTIONS} />
              </div>
            </div>
          </section>

          <div
            id="support"
            className={cn("flex h-[40vh] w-full max-w-[85dvw] items-end")}
          ></div>

          <div
            id="prints"
            className={cn(
              "text-foreground mx-auto flex h-full w-full max-w-[85dvw] flex-col items-center justify-start py-10",
            )}
          >
            <div className="flex w-full flex-col gap-y-16 rounded-4xl bg-white/90 p-6 pb-8 sm:px-14 sm:pt-12 sm:pb-16">
              <div className="sdh flex w-full max-w-[clamp(390px,60vw,1000em)] flex-col gap-8 text-start">
                <span className="flex w-full flex-col items-start gap-y-2">
                  <p
                    className={cn("font-barlow text-2xl font-medium uppercase")}
                  >
                    Take A Poster Home
                  </p>
                  <p className={cn("text-xl font-semibold sm:text-3xl")}>
                    Support independent art by getting our posters!
                  </p>
                </span>
                <span className="flex w-full flex-col items-start gap-y-2 text-lg">
                  <p>
                    This exhibition has been in the making for over a year, and
                    we are excited to finally share this work that has meant so
                    much to us. Our journey hasn&apos;t been easy: given the
                    current art funding landscape, we chose to remain
                    independent to keep our voice authentic and unregulated.
                    Unexpectedly, our initial venue closed just three months
                    before the exhibition, and Hase Studio generously opened
                    their doors to us.
                  </p>
                  <p>
                    To help cover our production costs, we&apos;re offering
                    three A3 posters created for the exhibition, based on The
                    European Space Agency&apos;s Sentinel satellite
                    visualizations. These images reflect Moisture Stress,
                    Moisture Index, and False Color in the Almería region in
                    late July 2025.{" "}
                  </p>
                  <p>
                    Posters are available on a sliding scale, with a suggested
                    minimum of 10€ to cover production costs. If you are
                    interested, please leave your name, contact, and the
                    poster(s) you&apos;d like in the form below. We&apos;ll be
                    in touch to arrange payment and collection.
                  </p>
                  <p>
                    Thank you for supporting this exhibition and for following
                    these quiet journeys from afar to home.
                  </p>
                </span>
              </div>
              <div
                className={cn(
                  "flex w-full flex-col gap-y-20 xl:grid xl:grid-cols-[max-content_auto]",
                )}
              >
                <div
                  className={cn(
                    "hidden flex-col items-center gap-10 md:flex md:flex-row",
                  )}
                >
                  {posterData.map((indPoster, index) => (
                    <div
                      className={cn(
                        "flex flex-col items-center gap-3 hover:cursor-pointer",
                      )}
                      key={indPoster.value}
                      onClick={() => setPoster(indPoster.value)}
                    >
                      <Image
                        src={indPoster.url}
                        width={300}
                        height={400}
                        alt={indPoster.name}
                        className={cn(
                          "3xl:max-w-none shadow-md hover:cursor-pointer xl:max-w-[12em] 2xl:max-w-[16em]",
                          poster === indPoster.value
                            ? "ring-foreground/50 rounded-sm ring-2 ring-offset-5"
                            : "",
                        )}
                      />
                      <p className={cn("!font-ubuntu font-medium")}>
                        {indPoster.name}
                      </p>
                    </div>
                  ))}
                </div>
                <ImgCarousel
                  slides={posterData}
                  options={OPTIONS}
                  className="sm:hidden"
                />
                <div
                  id="contact-form "
                  className={cn(
                    "flex flex-col items-center justify-center gap-5 pb-5 xl:min-w-md",
                  )}
                >
                  <p className={cn("!font-ubuntu font-medium")}>
                    Get in touch with us!
                  </p>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={cn(
                      "flex w-full flex-col items-center gap-4 sm:max-w-[70%]",
                    )}
                  >
                    <Input
                      className={cn(
                        "text-foreground border-foreground h-12 w-full rounded-xl bg-white px-4 text-base",
                      )}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                    />
                    <Input
                      className={cn(
                        "text-foreground border-foreground h-12 w-full rounded-xl bg-white px-4 text-base",
                      )}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                    />
                    <SelectSimple
                      options={posterData.map((poster) => ({
                        label: poster.name,
                        value: poster.value,
                      }))}
                      onChange={(value) => setPoster(value)}
                      value={poster}
                      placeholder="Select a poster (required)"
                      className="border-foreground !h-12 w-full rounded-xl bg-white data-[placeholder]:italic"
                    />

                    <Textarea
                      className={cn(
                        "text-foreground border-foreground h-24 w-full resize-none rounded-xl bg-white px-4 text-base",
                      )}
                      placeholder="Your message (optional)"
                      name="message"
                    />

                    <button
                      disabled={!isValidForm || submitCounter >= 5}
                      className={cn(
                        "border-foreground font-ubuntu bg-foreground w-full rounded-xl border-2 px-6 py-3 font-medium text-white hover:scale-[102%] hover:cursor-pointer active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                      )}
                    >
                      {pending ? (
                        <span
                          className={cn(
                            "flex w-full items-center justify-center gap-1",
                          )}
                        >
                          Sending...
                          <LuLoader className={cn("size-4 animate-spin")} />
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    {error && <p className="text-destructive">{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
        <BackToTop />
      </div>
    </>
  );
}
