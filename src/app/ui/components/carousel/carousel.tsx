"use client";
import { AboutCard } from "@/app/ui/components/about-card";
import { Artist } from "@/data/artist-info";
import { cn } from "@/utils/utils";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useDotButton } from "./carousel-dot-btn";
type BaseProps = {
  className?: string;
  options?: EmblaOptionsType;
};
interface CarouselProps extends BaseProps {
  slides: Artist[];
}

interface ImgCarouselProps extends BaseProps {
  slides: {
    name: string;
    url: string;
  }[];
}

export const EmblaCarousel = ({
  slides,
  options,
  className,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className={cn("embla", className)}>
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
                  className="absolute top-1/2 left-0 z-50 h-full w-10 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    onDotButtonClick(i > 0 ? i - 1 : slides.length - 1);
                  }}
                />
                <AboutCard
                  key={slide.name}
                  name={slide.name}
                  description={slide.description}
                  mobileDesc={slide.mobileDesc}
                  link={slide.link}
                  className={cn("embla__slide__number")}
                />
                <div
                  className="absolute top-1/2 right-0 z-50 h-full w-10 translate-x-1/4 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
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
export const ImgCarousel = ({
  slides,
  options,
  className,
}: ImgCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className={cn("embla", className)}>
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
                    onDotButtonClick(i > 0 ? i - 1 : slides.length - 1);
                  }}
                />
                {/* <AboutCard
                  key={slide.name}
                  name={slide.name}
                  description={slide.description}
                  mobileDesc={slide.mobileDesc}
                  link={slide.link}
                  className={cn(
                    "embla__slide__number",

                  )}
                /> */}
                <div
                  className={cn(
                    "embla__slide__number flex flex-col items-center gap-3",
                  )}
                >
                  <Image
                    src={slide.url}
                    alt={slide.name}
                    width={300}
                    height={400}
                  />
                </div>
                <div
                  className="absolute top-1/2 right-0 z-50 h-full w-10 translate-x-1/4 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    onDotButtonClick(i === slides?.length ? i - 1 : i + 1);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls mx-auto mt-3 flex w-full justify-center gap-3 md:mt-6">
        <div className="embla__dots mt-6 flex items-center gap-5">
          {scrollSnaps.map((_, index) => {
            const activeIndex = selectedIndex === index;
            return (
              <div
                className={cn(
                  "charles size-2.5 cursor-pointer rounded-full hover:scale-110 active:scale-95",
                  activeIndex
                    ? "bg-foreground scale-110 cursor-default"
                    : "border-foreground border-2",
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
