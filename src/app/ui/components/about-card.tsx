import { cn } from "@/utils/utils";
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
      <p className="!font-ubuntu text-left text-2xl font-medium">{name}</p>
      <span className="flex flex-col items-start gap-2 text-start">
        {description}
      </span>
    </div>
  );
};
