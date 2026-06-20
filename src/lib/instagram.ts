/** Parse Instagram post or reel shortcode from a URL */
export function getInstagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#]+)/i);
  return match?.[1] ?? null;
}

/** Build the embed URL for an Instagram post or reel */
export function getInstagramEmbedUrl(url: string): string {
  const shortcode = getInstagramShortcode(url);
  if (!shortcode) return url;

  const isReel = /\/reel\//i.test(url);
  const path = isReel ? `reel/${shortcode}` : `p/${shortcode}`;
  return `https://www.instagram.com/${path}/embed/captioned/?cr=1`;
}

/** Minimal embed — best chance of autoplay when visible (Instagram policy permitting) */
export function getInstagramAutoplayEmbedUrl(url: string): string {
  const shortcode = getInstagramShortcode(url);
  if (!shortcode) return url;

  const isReel = /\/reel\//i.test(url);
  const path = isReel ? `reel/${shortcode}` : `p/${shortcode}`;
  return `https://www.instagram.com/${path}/embed/?autoplay=1&mute=1&playsinline=1`;
}

/** Normalize to a clean Instagram post/reel URL for external links */
export function getInstagramPostUrl(url: string): string {
  const shortcode = getInstagramShortcode(url);
  if (!shortcode) return url;

  const isReel = /\/reel\//i.test(url);
  return isReel
    ? `https://www.instagram.com/reel/${shortcode}/`
    : `https://www.instagram.com/p/${shortcode}/`;
}
