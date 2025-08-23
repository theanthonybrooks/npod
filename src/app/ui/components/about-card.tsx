"use client";

import { Artist } from "@/data/artist-info";
import { cn } from "@/utils/utils";
import Link from "next/link";

interface AboutCardProps extends Artist {
  className?: string;
}

export const AboutCard = ({
  name,
  description,
  mobileDesc,
  link,
  className,
}: AboutCardProps) => {
  return (
    <div
      className={cn(
        "text-foreground flex h-full w-full flex-col items-start gap-y-4 rounded-4xl bg-white/90 p-6 px-10 pb-8 sm:px-14 sm:pb-10",
        className,
      )}
    >
      {/* TODO:fix the styling for hover. */}

      <Link
        className={cn(
          "!font-ubuntu text-left text-2xl font-medium decoration-2 hover:underline hover:underline-offset-4 active:underline-offset-2",
        )}
        href={link}
        target="_blank"
      >
        {name}
      </Link>

      <span className="hidden flex-col items-start gap-2 text-start text-lg lg:flex">
        {description}
      </span>
      <span className="flex h-full flex-col items-start justify-between gap-5 text-start text-lg lg:hidden">
        <span className={cn("flex flex-col items-start gap-2")}>
          {mobileDesc}
        </span>
        <Link
          className={cn(
            "!font-ubuntu text-left italic decoration-2 hover:underline hover:underline-offset-4 active:underline-offset-2",
          )}
          href={link}
          target="_blank"
        >
          Read more about {name?.split(" ")[0]}
        </Link>
      </span>
    </div>
  );
};
