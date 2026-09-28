import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { LatestVideo } from "@/lib/youtube.functions";

export function Sermons({ latestVideo }: { latestVideo?: LatestVideo | null }) {
  const { sermon } = siteConfig;
  const [playing, setPlaying] = useState(false);
  const v = latestVideo ?? null;

  const title = v?.title ?? sermon.title;
  const date = v?.published
    ? new Date(v.published).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : sermon.date;
  const watchUrl = v?.url ?? sermon.watchUrl;

  return (
    <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary-foreground/70">
              Latest message
            </p>
            <h2 className="font-display text-3xl font-semibold text-secondary-foreground md:text-4xl lg:text-5xl">
              Listen in before you walk in.
            </h2>
            <p className="mt-4 text-base text-secondary-foreground/80 md:text-lg">
              You don't have to wonder what we teach. Sample a recent message and decide for yourself.
            </p>

            <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-secondary-foreground/70">
                {v ? date : `${sermon.series} · ${sermon.date}`}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-secondary-foreground">
                {title}
              </h3>
              {!v && (
                <>
                  <p className="mt-1 text-sm text-secondary-foreground/75">{sermon.speaker}</p>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/85">
                    {sermon.summary}
                  </p>
                </>
              )}
              <a
                href={watchUrl}
                target={v ? "_blank" : undefined}
                rel={v ? "noopener noreferrer" : undefined}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                {v ? <ExternalLink className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                {v ? "Watch on YouTube" : "Watch the latest"}
              </a>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/15 bg-black/40">
            {v ? (
              playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                  title={v.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${v.title}`}
                  className="group absolute inset-0 h-full w-full"
                >
                  <img src={v.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                  <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
                    <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden />
                  </span>
                </button>
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center text-secondary-foreground/60">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                    <Play className="h-7 w-7" aria-hidden />
                  </div>
                  <p className="mt-4 text-sm">[Sermon video embed]</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
