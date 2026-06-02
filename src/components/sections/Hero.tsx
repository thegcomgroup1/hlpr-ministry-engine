import { MapPin, Clock } from "lucide-react";
import { PlanYourVisitButton } from "@/components/PlanYourVisitButton";
import { siteConfig } from "@/config/site";

/**
 * Hero — media-aware.
 *
 * The image is ALWAYS rendered as the base layer: it paints instantly,
 * is the mobile + slow-connection + reduced-motion fallback, and is what
 * search engines see. When heroMedia.type === "video" AND a videoSrc is
 * provided, a muted, looping, autoplaying clip is layered on top on
 * desktop only. Free mockups just leave type as "image" and nothing
 * about the video path runs.
 */
export function Hero() {
  const { heroMedia } = siteConfig.brand;
  const showVideo = heroMedia.type === "video" && Boolean(heroMedia.videoSrc);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Base layer: always present (instant paint, mobile, fallback, SEO) */}
      <img
        src={heroMedia.imageSrc}
        alt={`The ${siteConfig.church.name} congregation gathering on a Sunday morning`}
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Video layer: desktop only, sits over the image. The image shows
          through on mobile and when the user prefers reduced motion
          (see .hero-video rule in styles.css). */}
      {showVideo && (
        <video
          className="hero-video absolute inset-0 -z-10 hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroMedia.imageSrc}
        >
          <source src={heroMedia.videoSrc} />
        </video>
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

      <div className="mx-auto flex min-h-[640px] max-w-6xl flex-col items-start justify-center px-4 py-24 sm:px-6 md:min-h-[720px] md:py-32">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/80">
          {siteConfig.church.foundedLine}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[64px]">
          You're welcome at {siteConfig.church.name}.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          {siteConfig.church.mission}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <PlanYourVisitButton size="lg" />
          <a
            href="#times"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 bg-white/10 px-6 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            See service times
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/90">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden />
            <span className="text-sm font-medium">{siteConfig.service.timesShort}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            <span className="text-sm font-medium">{siteConfig.church.city}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
