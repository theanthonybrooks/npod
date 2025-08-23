"use client";
import { AboutCard } from "@/app/ui/components/about-card";
import { Artist } from "@/data/artist-info";
import { cn } from "@/utils/utils";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { ReactNode, useCallback } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./carousel-buttons";
import { DotButton, useDotButton } from "./carousel-dot-btn";

interface CarouselProps {
  data: {
    title: string;
    description: ReactNode;
  }[];
}

export default function Carousel({ data }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {/* <div className="min-w-0 flex-[0_0_100%] px-4">
          <div className="flex h-64 items-center justify-center bg-red-300">
            Slide 1
          </div>
        </div>
        <div className="min-w-0 flex-[0_0_100%] px-4">
          <div className="flex h-64 items-center justify-center bg-blue-300">
            Slide 2
          </div>
        </div>
        <div className="min-w-0 flex-[0_0_100%] px-4">
          <div className="flex h-64 items-center justify-center bg-green-300">
            Slide 3
          </div>
        </div> */}
        {data.map((item, index) => (
          <AboutCard
            key={item.title}
            name={item.title}
            description={item.description}
            className={cn("embla__slide")}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={scrollPrev}
          className="rounded bg-gray-800 px-4 py-2 text-white"
        >
          Prev
        </button>
        <button
          onClick={scrollNext}
          className="rounded bg-gray-800 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

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
    <div className="embla xl:max-w-[85vw]">
      <div className="embla__viewport px-10 sm:px-18 xl:px-0" ref={emblaRef}>
        <div className="embla__container max-w-[85vw]">
          {slides.map((slide, i) => {
            return (
              <div
                className="embla__slide flex-[0_0_100%] xl:flex-[0_0_33.333%]"
                key={i}
              >
                <AboutCard
                  key={slide.title}
                  name={slide.title}
                  description={slide.description}
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
