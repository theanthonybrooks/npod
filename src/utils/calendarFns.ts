import { cleanInput } from "@/utils/utils";

export const generateICSFile = (
  title: string,
  displayStartDate: Date,
  displayEndDate: Date,
  location: string,
  description: string,
  url: string,
) => {
  const formatIsoDate = (dateStr: Date) =>
    dateStr.toISOString().replace(/-|:|\.\d+/g, "");

  const formattedIsoDisplayStart = formatIsoDate(displayStartDate);
  const formattedIsoDisplayEnd = formatIsoDate(displayEndDate);
  const displayTitle = `No Point of Departure - ${title}`;
  const descriptionCleaned = cleanInput(description);

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//EN
BEGIN:VEVENT
SUMMARY:${displayTitle}
DTSTART:${formattedIsoDisplayStart}
DTEND:${formattedIsoDisplayEnd}
DESCRIPTION:${descriptionCleaned}
LOCATION:${location}
URL:${url}
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`.trim();

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
};
