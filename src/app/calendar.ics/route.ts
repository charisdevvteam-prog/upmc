import { buildConferenceIcs } from "@/lib/calendar";

export function GET() {
  return new Response(buildConferenceIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="upmc-2026.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
