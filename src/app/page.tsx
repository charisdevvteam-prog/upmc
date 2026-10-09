import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Boxes, FolderTree, Layers } from "lucide-react";

const areas = [
  {
    title: "Routes",
    path: "src/app",
    description:
      "Pages, layouts, and global styles. A new folder here is a new URL.",
    icon: Layers,
  },
  {
    title: "Interface",
    path: "src/components",
    description:
      "Shared pieces, including the buttons and cards already installed.",
    icon: Boxes,
  },
  {
    title: "Helpers",
    path: "src/lib",
    description: "Small utilities the rest of the app can import.",
    icon: FolderTree,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
          <a href="#top" className="text-sm font-semibold tracking-[0.18em]">
            UPMC
          </a>
          <Badge variant="secondary">Next.js</Badge>
        </div>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5">
        <section className="flex flex-col gap-6 py-16 sm:py-24">
          <p className="text-sm font-medium tracking-wide text-primary">
            App Router · TypeScript · Tailwind
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            UPMC is ready to build on.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            This is the Next.js application for the UPMC repository. The
            project shell is in place: routing, styling, and a small set of
            interface components.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#layout" />}
            >
              Project layout
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Next.js docs
            </Button>
          </div>
        </section>

        <section id="layout" className="grid gap-4 pb-20 sm:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.path}>
              <CardHeader>
                <area.icon className="text-primary" />
                <CardTitle className="text-base">{area.title}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {area.path}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>UPMC</span>
          <span>Next.js application</span>
        </div>
      </footer>
    </div>
  );
}
