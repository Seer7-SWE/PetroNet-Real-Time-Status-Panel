export function getAlertAge(timestamp, now=Date.now()) {
  if (!timestamp) return "--";

//   const now = Date.now();

  const ts =
    typeof timestamp === "number"
      ? timestamp
      : new Date(timestamp).getTime();

  if (Number.isNaN(ts)) return "--";

  const diff = Math.max(0, now - ts);

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);

  if (hrs > 0) return `${hrs}h ${mins % 60}m`;
  return `${mins}m`;
}
