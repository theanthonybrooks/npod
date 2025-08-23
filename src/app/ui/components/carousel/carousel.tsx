"use client";
import { AboutCard } from "@/app/ui/components/about-card";
import { Artist } from "@/data/artist-info";
import { cn } from "@/utils/utils";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./carousel-buttons";
import { DotButton, useDotButton } from "./carousel-dot-btn";

type PropType = {
  slides: Artist[];
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div
        className="embla__viewport flex justify-center px-10 sm:px-15 xl:px-0"
        ref={emblaRef}
      >
        <div className="embla__container max-w-[90vw]">
          {slides.map((slide, i) => {
            return (
              <div
                className="embla__slide flex-[0_0_100%] xl:flex-[0_0_33.333%]"
                key={i}
              >
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
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls sr-only">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots sr-only">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "embla__dot bg-white text-white",
                index === selectedIndex ? "embla__dot--selected" : "",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
