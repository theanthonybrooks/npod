import { cn } from "@/utils/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface AboutCardProps {
  name: string;
  description: ReactNode;
  className?: string;
}

export const AboutCard = ({ name, description, className }: AboutCardProps) => {
  return (
    <div
      className={cn(
        "text-foreground flex h-full w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 pb-8 sm:px-14",
        className,
      )}
    >
      {/* TODO:fix the styling for hover. */}

      <Link
        className={cn(
          "hover:unerline !font-ubuntu text-left text-2xl font-medium decoration-2 hover:underline-offset-4 active:underline-offset-2",
        )}
        href={`/artist/${name}`}
      >
        {name}
      </Link>

      <span className="flex flex-col items-start gap-2 text-start">
        {description}
      </span>
    </div>
  );
};
