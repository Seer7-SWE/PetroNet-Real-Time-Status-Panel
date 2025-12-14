export default function AlertsPanel({ alerts }) {
  if (!alerts || Object.keys(alerts).length === 0) {
    return <p>No active alerts</p>;
  }

  return (
    <div className="card alerts">
      <h2>Active Alerts</h2>

      <ul>
        {Object.values(alerts).map((a, idx) => (
          <li key={idx} className={`alert ${a.severity.toLowerCase()}`}>
            <strong>{a.severity}</strong> — {a.message}<br />
            <small>
              {a.sensorId} | {new Date(a.timestamp).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
