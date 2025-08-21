"use client";

import { Navbar } from "@/app/ui/components/navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Test() {
  const bgRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
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
    ScrollTrigger.create({
      trigger: startRef.current,
      pin: bgRef.current,
      pinSpacing: false,
      start: "top top",
      endTrigger: "footer",
      end: "bottom top",
      markers: true,
      invalidateOnRefresh: true,
    });

    // Refresh on load for images/fonts/layout shifts
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

        <section id="holdone" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section One</h2>
            <h2 className="lines">Have a COKE.</h2>
          </div>
        </section>

        <section id="holdtwo" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Two</h2>
            <h2 className="lines">AND.</h2>
          </div>
        </section>

        <section id="holdthree" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Three</h2>
            <h2 className="lines">a SMILE</h2>
          </div>
        </section>

        <section id="holdfour" className="panel" ref={startRef}>
          <div className="wrap center">
            <h2 className="lines">Section Four</h2>
            <h2 className="lines">and SOME</h2>
          </div>
        </section>
        <section id="holdthree" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Five</h2>
            <h2 className="lines">a SMILE</h2>
          </div>
        </section>

        <section id="holdfour" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Six</h2>
            <h2 className="lines">and SOME</h2>
          </div>
        </section>
        <section id="holdthree" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Seven</h2>
            <h2 className="lines">a SMILE</h2>
          </div>
        </section>

        <section id="holdfour" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Eight</h2>
            <h2 className="lines">and SOME</h2>
          </div>
        </section>
        <section id="holdthree" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Nine</h2>
            <h2 className="lines">a SMILE</h2>
          </div>
        </section>

        <section id="holdfour" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Ten</h2>
            <h2 className="lines">and SOME</h2>
          </div>
        </section>

        <section id="holdfive" className="panel">
          <div className="wrap center">
            <h2 className="lines">Section Eleven</h2>
            <h2 className="lines">more SECTIONS!</h2>
          </div>
        </section>
      </div>

      <section id="holdstart" className="panel">
        <div className="wrap center">
          <h1>End Panel</h1>
        </div>
        <p className="last" ref={endRef}></p>
      </section>
    </>
  );
}
