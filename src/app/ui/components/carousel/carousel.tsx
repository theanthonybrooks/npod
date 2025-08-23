"use client";
import { AboutCard } from "@/app/ui/components/about-card";
import { Artist } from "@/data/artist-info";
import { cn } from "@/utils/utils";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { usePrevNextButtons } from "./carousel-buttons";
import { useDotButton } from "./carousel-dot-btn";

type PropType = {
  slides: Artist[];
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  console.log(selectedIndex, scrollSnaps);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div
        className="embla__viewport flex justify-center px-10 sm:px-15 2xl:px-0"
        ref={emblaRef}
      >
        <div className="embla__container max-w-[90vw]">
          {slides.map((slide, i) => {
            return (
              <div
                className="embla__slide relative flex-[0_0_100%] 2xl:flex-[0_0_33.333%]"
                key={i}
              >
                <div
                  className="francis absolute top-1/2 left-0 z-50 h-full w-10 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    console.log("clicked");
                    onDotButtonClick(i > 0 ? i - 1 : slides.length - 1);
                  }}
                />
                <AboutCard
                  key={slide.name}
                  name={slide.name}
                  description={slide.description}
                  mobileDesc={slide.mobileDesc}
                  link={slide.link}
                  className={cn(
                    "embla__slide__number",

                    // lastSlide && "mr-10",
                    // firstSlide && "ml-4",
                  )}
                />
                <div
                  className="francis absolute top-1/2 right-0 z-50 h-full w-10 translate-x-1/4 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    console.log("clicked");
                    onDotButtonClick(i === slides?.length ? i - 1 : i + 1);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls sr-only mx-auto mt-6 flex w-full justify-center gap-3 lg:not-sr-only 2xl:sr-only">
        {/* <div className="embla__buttons sr-only">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}

        <div className="embla__dots mt-6 flex items-center gap-3 2xl:sr-only">
          {scrollSnaps.map((_, index) => {
            const activeIndex = selectedIndex === index;
            return (
              // <DotButton
              //   key={index}
              //   onClick={() => onDotButtonClick(index)}
              //   className={cn(
              //     "embla__dot bg-white text-white",
              //     index === selectedIndex ? "embla__dot--selected" : "",
              //   )}
              // />
              <div
                className={cn(
                  "size-4 cursor-pointer rounded-full hover:scale-110 active:scale-95",
                  activeIndex
                    ? "scale-110 cursor-default bg-white/90"
                    : "border-3 border-white/90",
                )}
                key={index}
                onClick={() => onDotButtonClick(index)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
