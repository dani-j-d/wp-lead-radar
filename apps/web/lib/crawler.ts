import { fetch } from "undici";
import * as cheerio from "cheerio";

export async function fetchPage(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; WPLeadRadar/1.0)"
      }
    });

    const html = await res.text();
    return html;
  } catch (e) {
    return null;
  }
}

export function detectWordPressIssues(html: string | null) {
  if (!html) {
    return {
      isBroken: true,
      issue: "NO_RESPONSE",
      severity: "critical",
      summary: "Site did not respond"
    };
  }

  const lower = html.toLowerCase();

  if (lower.includes("there has been a critical error on this website")) {
    return {
      isBroken: true,
      issue: "WP_CRITICAL_ERROR",
      severity: "critical",
      summary: "WordPress critical error detected"
    };
  }

  if (lower.includes("error establishing a database connection")) {
    return {
      isBroken: true,
      issue: "DB_CONNECTION_ERROR",
      severity: "critical",
      summary: "Database connection failure"
    };
  }

  if (lower.includes("500 internal server error")) {
    return {
      isBroken: true,
      issue: "HTTP_500",
      severity: "high",
      summary: "Server error detected"
    };
  }

  return {
    isBroken: false
  };
}