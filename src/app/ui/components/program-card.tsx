import { cn } from "@/utils/utils";
import { format, intervalToDuration, isBefore } from "date-fns";

interface ProgramCardProps {
  title: string;
  description: string;
  start: Date;
  end: Date;
  shouldDisplayTime?: boolean;
}

export const ProgramCard = ({
  title,
  description,
  shouldDisplayTime,
  start,
  end,
}: ProgramCardProps) => {
  let displayTimeLeft: string | null = null;

  const now = new Date();
  const ended = isBefore(end, now);
  const startStr = format(start, "MMMM do, h");
  const endStr = format(end, "h aaa");

  const timeString = `${startStr} - ${endStr}`;

  if (!ended) {
    const eventDuration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const remainingDuration =
      (end.getTime() - now.getTime()) / (1000 * 60 * 60);
    const duration = intervalToDuration({ start: now, end });
    const hours = duration.hours ?? 0;
    const minutes = duration.minutes ?? 0;

    if (remainingDuration < eventDuration) {
      if (hours > 0 && minutes > 0) {
        displayTimeLeft = `${hours} ${hours === 1 ? "hr" : "hrs"} & ${minutes} ${minutes === 1 ? "min" : "mins"} left`;
      } else if (hours > 0) {
        displayTimeLeft = `${hours} ${hours === 1 ? "hr" : "hrs"} left`;
      } else if (minutes > 0) {
        displayTimeLeft = `${minutes} ${minutes === 1 ? "min" : "mins"} left`;
      }
    }
  } else {
    displayTimeLeft = "Ended";
  }

  return (
    <div className="text-foreground flex w-full flex-col items-start gap-y-2 rounded-4xl bg-white/90 p-6 pb-8 sm:px-14">
      <p className="!font-ubuntu text-left text-2xl font-medium">{title}</p>
      <span className="flex items-baseline gap-2">
        <p className={cn("text-lg font-medium italic")}>{timeString}</p>
        {shouldDisplayTime && displayTimeLeft && (
          <p className="text-foreground/70">({displayTimeLeft})</p>
        )}
        {!shouldDisplayTime && ended && (
          <p className="text-foreground/70">({displayTimeLeft})</p>
        )}
      </span>
      <p className="mt-3 text-start text-lg">{description}</p>
    </div>
  );
};
