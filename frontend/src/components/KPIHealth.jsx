export default function KPIHealth({ sensors }) {
  if (!sensors) return null;

  const values = Object.values(sensors);

  const total = values.length;
  const score = values.reduce((acc, s) => {
    if (s.status === "normal") return acc + 1;
    if (s.status === "high") return acc + 0.5;
    return acc;
  }, 0);

  const percent = Math.round((score / total) * 100);

  const color =
    percent > 80 ? "#22c55e" :
    percent > 50 ? "#facc15" :
    "#ef4444";

  return (
    <div className="panel kpi">
      <h3>System Health</h3>

      <div className="kpi-bar">
        <div
          className="kpi-fill"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>

      <div className="kpi-value" style={{ color }}>
        {percent}%
      </div>
    </div>
  );
}

