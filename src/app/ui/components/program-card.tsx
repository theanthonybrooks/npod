"use client";

import { TooltipSimple } from "@/components/ui/tooltip";
import { generateICSFile } from "@/utils/calendarFns";
import { cn } from "@/utils/utils";
import { format, intervalToDuration, isBefore } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuCalendarCheck, LuCalendarHeart } from "react-icons/lu";

interface ProgramCardProps {
  title: string;
  description: string;
  start: Date;
  end: Date;
  shouldDisplayTime?: boolean;
}

interface SavedEvent {
  key: string;
  title: string;
  start: string;
  end: string;
}

export const ProgramCard = ({
  title,
  description,
  shouldDisplayTime,
  start,
  end,
}: ProgramCardProps) => {
  let displayTimeLeft: string | null = null;
  const [isSaved, setIsSaved] = useState(false);

  const now = new Date();
  const ended = isBefore(end, now);
  const startStr = format(start, "MMMM do, h");
  const endStr = format(end, "h aaa");

  const timeString = `${startStr} - ${endStr}`;
  const url = "https://npod.online/program";
  const location = "https://maps.app.goo.gl/enh2Jm1Z48Krz1VAA";

  const icsLink = generateICSFile(
    title,
    start,
    end,
    location,
    description,
    url,
  );

  const eventKey = `${title}-${start.toISOString()}`;

  useEffect(() => {
    const saved = loadSavedEvents();
    setIsSaved(saved.some((ev) => ev.key === eventKey));
  }, [eventKey]);

  const handleAddToCalendar = () => {
    const saved = loadSavedEvents();

    if (!saved.some((ev) => ev.key === eventKey)) {
      const newEvent: SavedEvent = {
        key: eventKey,
        title,
        start: start.toISOString(),
        end: end.toISOString(),
      };
      const updated = [...saved, newEvent];
      saveEvents(updated);
      setIsSaved(true);
    }
  };

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
        {!ended && (
          <TooltipSimple
            content={isSaved ? "Saved" : "Save to calendar"}
            side="top"
          >
            <Link
              href={icsLink}
              download={`${title.replace(/\s+/g, "_")}.ics`}
              onClick={handleAddToCalendar}
            >
              {isSaved ? (
                <LuCalendarCheck className="text-foreground -mb-0.5 hidden size-4 cursor-pointer self-center hover:scale-105 active:scale-95 md:block" />
              ) : (
                <LuCalendarHeart className="text-foreground -mb-0.5 hidden size-4 animate-pulse cursor-pointer self-center hover:scale-105 active:scale-95 md:block" />
              )}
            </Link>
          </TooltipSimple>
        )}
        {shouldDisplayTime && displayTimeLeft && (
          <p className="text-foreground/70">({displayTimeLeft})</p>
        )}
        {!shouldDisplayTime && ended && (
          <p className="text-foreground/70">({displayTimeLeft})</p>
        )}
      </span>
      <p className="mt-3 text-start text-lg">{description}</p>
      <Link
        href={icsLink}
        download={`${title.replace(/\s+/g, "_")}.ics`}
        className={cn("w-full")}
        onClick={handleAddToCalendar}
      >
        <button
          className={cn(
            "border-foreground font-ubuntu text-foreground mt-4 w-full rounded-xl border-[1.5px] bg-white/90 px-6 py-2 font-medium hover:scale-[102%] hover:cursor-pointer active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:hidden",
          )}
        >
          {isSaved ? "Saved" : "Add to calendar"}
        </button>
      </Link>

      {/* <p className={cn("mt-2 md:hidden")}>Add to calendar</p> */}
    </div>
  );
};

const loadSavedEvents = (): SavedEvent[] => {
  try {
    const raw = localStorage.getItem("savedEvents");
    return raw ? (JSON.parse(raw) as SavedEvent[]) : [];
  } catch {
    return [];
  }
};

const saveEvents = (events: SavedEvent[]) => {
  localStorage.setItem("savedEvents", JSON.stringify(events));
};
