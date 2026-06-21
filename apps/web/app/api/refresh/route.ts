import { createLead } from "../../../../../packages/db/src";
import { fetchPage, detectWordPressIssues } from "../../../lib/crawler";

function normalize(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * STEP 1: REAL WORDPRESS TARGET DISCOVERY
 * We use footprint-based search queries (NOT "broken site" queries)
 */
const discoveryQueries = [
  "inurl:wp-content",
  "inurl:wp-login.php",
  "powered by wordpress",
  "wordpress site"
];

/**
 * STEP 2: SIMPLE SEARCH (keep your existing function)
 */
import { searchSearxng } from "../../../lib/searchSearxng";

/**
 * STEP 3: PROBE PATHS (THIS IS THE KEY CHANGE)
 * We do NOT trust homepage alone.
 */
const probePaths = [
  "/", 
  "/wp-login.php",
  "/wp-admin"
];

export async function POST() {
  console.log("🚀 WP DISCOVERY STARTED");

  let totalFound = 0;
  const seen = new Set<string>();

  for (const query of discoveryQueries) {
    console.log("🔎 Discovering:", query);

    //const urls = await searchSearxng(query);
    const urls = [
      "https://wordpress.org",
      "https://example.com",
      "https://wpengine.com",
      "https://www.wpbeginner.com"
    ];

    console.log("🌐 RAW RESULTS:", urls.length);

    for (const rawUrl of urls) {
      const domain = normalize(rawUrl);
      if (!domain) continue;

      // avoid duplicates
      if (seen.has(domain)) continue;
      seen.add(domain);

      console.log("🎯 TARGET:", domain);

      /**
       * STEP 4: ACTIVE PROBING (THIS IS THE CORE LOGIC)
       */
      for (const path of probePaths) {
        const target = domain + path;

        console.log("➡️ Probing:", target);

        const html = await fetchPage(target);

        const result = detectWordPressIssues(html);

        console.log("🧪 RESULT:", result);

        if (result.isBroken) {
          console.log("🔥 LEAD FOUND:", domain);

          createLead({
            domain,
            issue_type: result.issue ?? "UNKNOWN",
            severity: result.severity ?? "unknown",
            summary: result.summary ?? "Detected via active probe",
            suggested_fix:
              "Check WP core, plugins, DB, hosting, or security layer"
          });

          totalFound++;
          break; // stop probing once broken site confirmed
        }
      }
    }
  }

  console.log("✅ TOTAL LEADS:", totalFound);

  return Response.json({
    ok: true,
    leads_found: totalFound
  });
}