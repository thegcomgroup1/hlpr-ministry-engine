/**
 * HLPR Master Ministry Base — site configuration (the swap layer).
 *
 * To re-skin for a new church, change values in this file plus the brand
 * tokens in src/styles.css. The structure of the page never changes.
 *
 * All copy below is written warm/plain/human, addressed to a nervous
 * first-time visitor. Square-bracket tokens are obvious swap targets.
 */

import heroImage from "@/assets/placeholders/hero.jpg";
import storyImage from "@/assets/placeholders/story.jpg";
import life1 from "@/assets/placeholders/life-1.jpg";
import life2 from "@/assets/placeholders/life-2.jpg";
import life3 from "@/assets/placeholders/life-3.jpg";
import life4 from "@/assets/placeholders/life-4.jpg";
import life5 from "@/assets/placeholders/life-5.jpg";
import life6 from "@/assets/placeholders/life-6.jpg";

export const siteConfig = {
  church: {
    name: "[CHURCH NAME]",
    shortName: "[CHURCH]",
    city: "[CITY, ST]",
    tagline: "A welcoming home for people just like you.",
    mission:
      "We're a church for anyone who's ever wondered if there's a place for them. There is — and it's right here.",
    story: [
      "[CHURCH NAME] started in [YEAR] with a handful of families and one quiet conviction: that anyone who walked through the doors should feel like they already belonged.",
      "All these years later, that's still the heart of who we are. We're ordinary people — parents, grandparents, kids, college students, retirees — learning what it looks like to follow Jesus together in [CITY].",
    ],
    foundedLine: "Serving [CITY] since [YEAR]",
  },

  brand: {
    logoText: "[CHURCH]",
    /**
     * Hero media. Free mockups: leave type as "image" (videoSrc ignored).
     * Live sites / paid builds: set type to "video" and point videoSrc at a
     * compressed, muted, loopable .mp4/.webm. imageSrc is ALWAYS used as the
     * poster, the mobile fallback, and the reduced-motion fallback.
     */
    heroMedia: {
      type: "image" as "image" | "video",
      imageSrc: heroImage,
      videoSrc: "",
    },
    storyImageSrc: storyImage,
  },

  service: {
    timesShort: "Sundays · 9:00 & 10:45 AM",
    timesLong: [
      { day: "Sunday", time: "9:00 AM" },
      { day: "Sunday", time: "10:45 AM" },
    ],
    address: "[123 Street Name, City, ST 00000]",
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=-97.7437%2C30.2660%2C-97.7372%2C30.2706&layer=mapnik",
    mapLinkUrl: "https://www.google.com/maps",
    practical: [
      { label: "Parking", value: "Free, right out front" },
      { label: "Service length", value: "Around 70 minutes" },
      { label: "What to wear", value: "Whatever you're comfortable in" },
    ],
  },

  expect: [
    {
      icon: "Heart" as const,
      title: "You'll be welcomed, not cornered",
      body: "A friendly hello at the door — and that's it. Nobody will single you out, ask you to stand, or put you on the spot.",
    },
    {
      icon: "Clock" as const,
      title: "About 70 minutes, start to finish",
      body: "Music, a practical message from the Bible, and a few minutes to breathe. You'll know what's happening the whole time.",
    },
    {
      icon: "Shirt" as const,
      title: "Come as you are",
      body: "Jeans, dress, t-shirt, suit — all of it shows up on Sunday. Wear what feels like you.",
    },
    {
      icon: "Baby" as const,
      title: "Your kids are in great hands",
      body: "Safe, fun, age-appropriate spaces for newborns through 5th grade. Check-in is simple and we'll walk you through it.",
    },
  ],

  life: [
    { src: life1, alt: "Volunteers laughing while setting up the welcome table" },
    { src: life2, alt: "Kids laughing during a craft in kids ministry" },
    { src: life3, alt: "Worship inside the sanctuary" },
    { src: life4, alt: "Two members hugging after service" },
    { src: life5, alt: "A small group gathered in a living room" },
    { src: life6, alt: "Volunteers serving meals in the community" },
  ],

  ministries: [
    { name: "Kids", line: "Sundays designed around your kids, not in spite of them." },
    { name: "Students", line: "A place for middle and high schoolers to be known." },
    { name: "Young Adults", line: "Real friendships for the in-between years." },
    { name: "Small Groups", line: "Life is better in a circle of eight than a row of two hundred." },
    { name: "Care & Counseling", line: "When life gets hard, you don't walk through it alone." },
    { name: "Serve", line: "Find a spot to give back — in the church and across the city." },
  ],

  events: [
    {
      date: "This Sunday",
      title: "Newcomer Welcome",
      blurb: "First time here? Grab coffee with our team right after the service.",
    },
    {
      date: "Sat, [Date]",
      title: "Community Workday",
      blurb: "We're partnering with a local school for a morning of cleanup and care.",
    },
    {
      date: "[Date]",
      title: "Family Night",
      blurb: "Food trucks, games, and a short message for the whole family.",
    },
  ],

  sermon: {
    title: "[Latest Message Title]",
    speaker: "[Speaker Name]",
    series: "[Series Name]",
    date: "[Recent Date]",
    summary:
      "A short, practical look at what it means to follow Jesus in the middle of an ordinary week.",
    embedUrl: "", // YouTube/FB/podcast embed
    watchUrl: "#",
  },

  give: {
    line: "Every gift goes toward people — locally and around the world. Give online in about thirty seconds.",
    onlineUrl: "#",
  },

  welcomeVideo: {
    enabled: false,
    eyebrow: "Meet us first",
    heading: "A quick hello before you visit.",
    body: "We know visiting a new church can feel like a big step. So before you ever walk through the doors, here's a short hello from our team — who we are, and what Sunday looks like.",
    posterSrc: storyImage,
    embedUrl: "",
  },

  contact: {
    phone: "[(000) 000-0000]",
    email: "[hello@church.org]",
    socials: [
      { label: "Facebook", url: "#" },
      { label: "Instagram", url: "#" },
      { label: "YouTube", url: "#" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
