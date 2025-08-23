import { ReactNode } from "react";

interface AboutCardProps {
  name: string;
  description: ReactNode;
}

export const AboutCard = ({ name, description }: AboutCardProps) => {
  return (
    <div className="text-foreground flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 pb-8 sm:px-14">
      <p className="!font-ubuntu text-left text-2xl font-medium">{name}</p>
      <span className="flex flex-col items-start gap-2 text-start">
        {description}
      </span>
    </div>
  );
};
