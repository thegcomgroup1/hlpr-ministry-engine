import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type LatestVideo = {
  id: string;
  title: string;
  published: string;
  url: string;
  thumbnail: string;
};

/**
 * Reads the channel's public YouTube feed. New uploads show up here within
 * minutes of publishing, so the site always shows the newest video with no
 * manual updates and no API key.
 */
export const getLatestYouTubeVideo = createServerFn({ method: "GET" })
  .inputValidator(z.object({ channelId: z.string() }))
  .handler(async ({ data }): Promise<LatestVideo | null> => {
    if (!data.channelId) return null;
    try {
      const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(data.channelId)}`,
      );
      if (!res.ok) return null;
      const xml = await res.text();
      const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
      if (!entry) return null;
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      if (!id) return null;
      const title =
        entry
          .match(/<title>([^<]*)<\/title>/)?.[1]
          ?.replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">") ?? "Latest video";
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      return {
        id,
        title,
        published,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    } catch {
      return null;
    }
  });
