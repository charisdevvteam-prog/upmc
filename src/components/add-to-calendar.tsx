"use client";

import { Calendar } from "lucide-react";
import { btn } from "@/lib/btn";
import { buildGoogleCalendarUrl } from "@/lib/calendar";

export function AddToCalendarButton() {
  const onClick = () => {
    const apple = /iPhone|iPad/i.test(navigator.userAgent);
    if (apple) {
      // Opens Calendar on Apple devices with both days ready to save.
      window.location.href = "/calendar.ics";
      return;
    }

    // Opens Google Calendar with the event filled in. Tap Save to add it.
    window.open(buildGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`gap-2 ${btn({ variant: "primary", size: "lg" })}`}
    >
      <Calendar aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
      Add to calendar
    </button>
  );
}
