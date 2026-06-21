export type Severity =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface Lead {
  id?: number;

  domain: string;

  issueType: string;

  severity: Severity;

  summary: string;

  suggestedFix: string;
}