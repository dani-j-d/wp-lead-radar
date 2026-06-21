export function scoreLead(text: string) {
    const t = text.toLowerCase();
  
    if (t.includes("down")) return 95;
    if (t.includes("critical error")) return 90;
    if (t.includes("wordpress")) return 80;
  
    return 50;
  }