import { redditSource } from "./reddit";
import { facebookSource } from "./facebook";
import { forumSource } from "./forums";
import { searxngSource } from "./searxng";

export const sources = [
  redditSource,
  facebookSource,
  forumSource,
  searxngSource
];

export async function fetchAllSources() {
  const results = await Promise.all(
    sources.map((s) => s.fetch())
  );

  return results.flat();
}