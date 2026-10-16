import { church, conferenceSchedule } from "@/lib/content";

function stamp(isoLocal: string) {
  return isoLocal.replace(/[-:]/g, "").slice(0, 15);
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

const descriptionLines = [
  `${church.conference} (${church.shortName}).`,
  `${conferenceSchedule.summary}.`,
  "Join in person or online.",
  `Contact: ${church.email}, ${church.phone}`,
];

const description = descriptionLines.join("\\n");

export function buildGoogleCalendarUrl() {
  const [saturday, sunday] = conferenceSchedule.days;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${church.conference} (${church.shortName})`,
    dates: `${stamp(saturday.start)}/${stamp(saturday.end)}`,
    ctz: conferenceSchedule.timezone,
    details: [
      ...descriptionLines,
      `${saturday.dateLabel}, 3:00 PM to 8:00 PM.`,
      `${sunday.dateLabel}, 3:00 PM to 8:00 PM.`,
      "Please also add Sunday so you have a reminder for both days.",
    ].join("\n"),
    location: conferenceSchedule.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildConferenceIcs() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Temple of Charis//UPMC//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${church.shortName} ${conferenceSchedule.year}`,
    `X-WR-TIMEZONE:${conferenceSchedule.timezone}`,
  ];

  for (const day of conferenceSchedule.days) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:upmc-${conferenceSchedule.year}-${day.key}@thetempleofcharis.com`,
      `DTSTAMP:${stamp(new Date().toISOString())}Z`,
      `DTSTART;TZID=${conferenceSchedule.timezone}:${stamp(day.start)}`,
      `DTEND;TZID=${conferenceSchedule.timezone}:${stamp(day.end)}`,
      `SUMMARY:${escapeIcs(`${church.conference} (${church.shortName}) - ${day.label}`)}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${escapeIcs(conferenceSchedule.location)}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
