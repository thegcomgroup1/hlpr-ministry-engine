import { useState } from "react";
import { Play } from "lucide-react";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { siteConfig } from "@/config/site";

/**
 * WelcomeVideo — OPTIONAL.
 *
 * Renders nothing unless welcomeVideo.enabled is true AND an embedUrl is
 * provided. Click-to-play (poster thumbnail + play button) so the heavy
 * iframe only loads when the visitor chooses to watch — keeps the page
 * fast for everyone who doesn't. Provide a YouTube/Vimeo *embed* URL
 * (e.g. https://www.youtube.com/embed/VIDEO_ID).
 */
export function WelcomeVideo() {
  const v = siteConfig.welcomeVideo;
  const [playing, setPlaying] = useState(false);

  if (!v.enabled || !v.embedUrl) return null;

  const src = playing
    ? `${v.embedUrl}${v.embedUrl.includes("?") ? "&" : "?"}autoplay=1`
    : "";

  return (
    <section id="welcome" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              {v.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
              {v.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {v.body}
            </p>
            <div className="mt-8">
              <PlanYourVisitButton size="lg" />
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            {playing ? (
              <iframe
                src={src}
                title={v.heading}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play welcome video"
                className="group absolute inset-0 h-full w-full"
              >
                <img
                  src={v.posterSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform group-hover:scale-105">
                  <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
