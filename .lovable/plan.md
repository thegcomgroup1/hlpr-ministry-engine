## Plan: Add "Powered by HLPR Ministries" to footer

Update the site footer in `src/components/sections/Footer.tsx` so the bottom-right legal area includes a "Powered by HLPR Ministries" link next to the existing rights-reserved text.

What will change:
- In the bottom `div` that currently renders "© {year} {siteConfig.church.name}. All rights reserved.", refactor the layout so the copyright line is left-aligned and a new right-aligned line reads "Powered by HLPR Ministries".
- The "HLPR Ministries" text will be a standard `<a>` linking to `https://ministries.hlpr.io`, opening in a new tab (`target="_blank"`, `rel="noopener noreferrer"`), styled with `text-muted-foreground hover:text-foreground` to match the footer link treatment.
- Preserve the existing border-t/pt-6/mt-10 spacing and the responsive container max-width.
- No other footer content, nav, or site configuration changes.

Why this approach:
- Keeps the footer minimal and balanced on desktop while still stacking naturally on mobile.
- Uses existing footer color tokens so the link remains muted until hovered.
- External agency link opens in a new tab so the visitor stays on the church site.

Scope is limited to one component file and one string/link addition.