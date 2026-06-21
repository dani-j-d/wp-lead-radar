export function detectIssue(
    html: string,
    status: number
  ) {
    if (status >= 500) {
      return {
        issueType: "500_ERROR",
        severity: "critical",
        summary: "Server returning 500 error",
        suggestedFix:
          "Review PHP logs and disable recently updated plugins"
      };
    }
  
    if (
      html.includes(
        "There has been a critical error on this website"
      )
    ) {
      return {
        issueType: "WP_CRITICAL_ERROR",
        severity: "critical",
        summary:
          "WordPress fatal error detected",
        suggestedFix:
          "Enable WP_DEBUG and inspect debug.log"
      };
    }
  
    return null;
  }