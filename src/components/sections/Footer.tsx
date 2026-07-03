import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-semibold text-secondary">
              {siteConfig.church.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{siteConfig.service.address}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {siteConfig.contact.phone} · {siteConfig.contact.email}
            </p>
          </div>

          <nav aria-label="Social" className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {year} {siteConfig.church.name}. All rights reserved.</span>
          <span>
            Powered by{" "}
            <a
              href="https://ministries.hlpr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              HLPR Ministries
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
