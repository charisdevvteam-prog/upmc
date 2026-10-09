import { church } from "@/lib/content";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">{church.name}</p>
          <p className="mt-2 text-sm text-white/70">{church.tagline}</p>
          <p className="mt-4 text-sm text-white/70">{church.pastor}</p>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold tracking-[0.16em] uppercase">
            Find us
          </p>
          <p className="mt-3 text-sm leading-7 text-white/80">{church.address}</p>
          <a
            href={church.mapsUrl}
            className="mt-2 inline-block text-sm text-[#89b4e6] underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold tracking-[0.16em] uppercase">
            Contact
          </p>
          <a
            href={`mailto:${church.email}`}
            className="mt-3 block text-sm text-white/80 hover:text-white"
          >
            {church.email}
          </a>
          <a
            href={`tel:${church.phone.replace(/\s/g, "")}`}
            className="mt-2 block text-sm text-white/80 hover:text-white"
          >
            {church.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-white/50 sm:px-8">
          © <CopyrightYear /> {church.name}
        </p>
      </div>
    </footer>
  );
}
