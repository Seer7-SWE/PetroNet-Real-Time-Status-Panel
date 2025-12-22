import { useEffect, useState } from "react";
import { getAlertAge } from "../utils/alertAge";

export default function AlertsPanel({ alerts }) {
  const [now, setNow] = useState(Date.now());
  const [ackMap, setAckMap] = useState({}); 

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const list = Object.entries(alerts || {});

  const acknowledgeAlert = (id) => {
    setAckMap((prev) => ({
      ...prev,
      [id]: {
        acknowledged: true,
        timestamp: new Date().toLocaleTimeString()
      }
    }));
  };

  if (list.length === 0) {
    return <p style={{ opacity: 0.6 }}>No active alerts</p>;
  }

  return (
    <div>
      <h3 style={{ marginBottom: "8px" }}>ALERTS</h3>

      <div style={{ maxHeight: "420px", overflowY: "auto" }}>
        {list.map(([id, alert]) => {
          const localAck = ackMap[id];
          const isAcked = alert.acknowledged || localAck;

          return (
            <div
              key={id}
              className={`
                alert-card
                ${
                  alert.severity === "CRITICAL" && !isAcked
                    ? "alert-critical blink-critical"
                    : ""
                }
                ${alert.severity === "HIGH" ? "alert-high" : ""}
              `}
              style={{
                padding: "10px",
                marginBottom: "10px",
                opacity: isAcked ? 0.5 : 1,
                background: "#020617"
              }}
            >
              <strong>{alert.severity}</strong>
              <p style={{ margin: "4px 0" }}>{alert.message}</p>

              <small style={{ fontSize: "12px", opacity: 0.7, display: "block", marginBottom: "6px" }}>
                {localAck
                  ? `Acknowledged at ${localAck.timestamp}`
                  : `Age: ${getAlertAge(alert.timestamp, now)}`}
              </small>

              {!isAcked && (
                  <button
                   onClick={() => acknowledgeAlert(id)}
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    background: "#111827",
                    color: "#e5e7eb",
                    border: "1px solid #374151",
                    cursor: "pointer",
                  }}
                >
                  Acknowledge
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
