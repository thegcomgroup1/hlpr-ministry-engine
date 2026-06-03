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
/**
 * Accepts any of these and returns a normalized embed URL:
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://www.youtube.com/embed/ID
 *  - https://vimeo.com/ID
 *  - https://player.vimeo.com/video/ID
 * Returns null if it can't recognize the provider.
 */
function toEmbedUrl(raw: string): string | null {
  if (!raw) return null;
  const url = raw.trim();

  // YouTube
  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  // Vimeo
  const vimeo = url.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Already an embed-style URL from another provider — pass through.
  if (/\/embed\//.test(url) || /player\./.test(url)) return url;

  return null;
}

export function WelcomeVideo() {
  const v = siteConfig.welcomeVideo;
  const [playing, setPlaying] = useState(false);

  if (!v.enabled || !v.embedUrl) return null;

  const embedUrl = toEmbedUrl(v.embedUrl);
  if (!embedUrl) return null;

  const src = playing
    ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`
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
