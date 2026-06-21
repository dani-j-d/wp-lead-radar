import { NextResponse } from "next/server";

export async function GET() {
  const { getLeads } = await import("../../../../../packages/db/src");
  return NextResponse.json(getLeads());
}