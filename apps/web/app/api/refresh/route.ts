import { fetchAllSources } from "@/lib/sources";
import { scoreLead } from "@/lib/extractors/score";
import { extractEmails } from "@/lib/extractors/email";

export async function POST() {
  const raw = await fetchAllSources();

  const leads = raw
    .map((l) => {
      const text = `${l.title} ${l.snippet || ""}`;

      return {
        ...l,
        score: scoreLead(text),
        emails: extractEmails(text)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return Response.json({
    ok: true,
    leads
  });
}