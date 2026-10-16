"use client";

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
      className={btn({ variant: "primary", size: "lg" })}
    >
      Add to calendar
    </button>
  );
}
