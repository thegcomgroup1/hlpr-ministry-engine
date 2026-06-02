## Add optional video capability to the Master Base

Bake video support into the base so it's available per-church via config flags. Image-only mockups (including OFN) need zero changes — video is purely opt-in.

### Files to change

**1. Replace `src/components/sections/Hero.tsx`** with the attached `Hero.tsx`. Image is always the base layer; a muted/looping `<video>` overlays on desktop only when `heroMedia.type === "video"` and a `videoSrc` is set. Image doubles as poster + mobile + reduced-motion fallback.

**2. Create `src/components/sections/WelcomeVideo.tsx`** from the attached file. Renders nothing unless `welcomeVideo.enabled === true` and `embedUrl` is set. Click-to-play poster → autoplay iframe (YouTube/Vimeo embed URL), so the heavy iframe never loads for visitors who scroll past.

**3. Edit `src/config/site.ts`:**
- Inside `brand`, replace `heroImageSrc: heroImage,` with a `heroMedia` block:
  ```ts
  heroMedia: {
    type: "image" as "image" | "video",
    imageSrc: heroImage,
    videoSrc: "",
  },
  ```
  Keep `storyImageSrc` as-is.
- Add a new top-level `welcomeVideo` block (before `contact`):
  ```ts
  welcomeVideo: {
    enabled: false,
    eyebrow: "Meet us first",
    heading: "A quick hello before you visit.",
    body: "We know visiting a new church can feel like a big step. So before you ever walk through the doors, here's a short hello from our team — who we are, and what Sunday looks like.",
    posterSrc: storyImage,
    embedUrl: "",
  },
  ```
- Note: the explicit `as "image" | "video"` annotation is required so `as const` doesn't lock `type` to the `"image"` literal.

**4. Edit `src/routes/index.tsx`:** import `WelcomeVideo` and render `<WelcomeVideo />` directly after `<MissionStory />`.

**5. Edit `src/styles.css`:** append a reduced-motion rule so the video hides for users who prefer reduced motion (image fallback shows through):
```css
@media (prefers-reduced-motion: reduce) {
  .hero-video { display: none !important; }
}
```

### Verification
- Confirm no remaining references to `siteConfig.brand.heroImageSrc` anywhere in the codebase (Hero is the only consumer; the new field is `heroMedia.imageSrc`).
- Confirm build passes with both flags off (default state — matches OFN's needs).

### Out of scope
- No OFN content swap. No actual video assets. No structural changes elsewhere.
