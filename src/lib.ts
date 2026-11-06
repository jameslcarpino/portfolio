// Frontmatter dates parse as UTC midnight; format them in UTC so the day never shifts.
export function fmtDate(d: Date, style: "short" | "long" = "short") {
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: style,
    day: "numeric",
  });
}
