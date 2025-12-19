import { ref, update } from "firebase/database";
import { database } from "../firebaseConfig";
import { getAlertAge } from "../utils/alertAge";
import { useEffect, useState } from "react";


export default function AlertsPanel({ alerts }) {
  const [ now, setNow ] = useState(Date.now());
    useEffect(() => {
      const interval = setInterval(() => {
      setNow(Date.now());
      }, 60000);
      return () => clearInterval(interval);
       }, []);
  
  const list = Object.entries(alerts || {});
   

  const acknowledgeAlert = (id) => {
    update(ref(database, `alerts/${id}`), {
      acknowledged: true
    });
  };

  if (list.length === 0) {
    return <p style={{ opacity: 0.6 }}>No active alerts</p>;
  }

  


  return (
    <div>
      <h3 style={{ marginBottom: "8px" }}>ALERTS</h3>

      <div style={{ maxHeight: "420px", overflowY: "auto" }}>
        {list.map(([id, alert]) => (
          
          <div
              key={id}
              className={`
                 alert-card
                 ${alert.severity === "CRITICAL" ? "alert-critical blink-critical" : ""}
                 ${alert.severity === "HIGH" ? "alert-high" : ""}
              `}
              style={{
                padding: "10px",
                marginBottom: "10px",
                opacity: alert.acknowledged ? 0.5 : 1,
                background: "#020617"
              }}
          >
      
            <strong>{alert.severity}</strong>
                  <p style={{ margin: "4px 0" }}>{alert.message}</p>

               <small style={{ fontSize: "12px", opacity: 0.7 }}>
                  Age: {getAlertAge(alert.timestamp, now)}
               </small>


            {!alert.acknowledged && (
              <button
                onClick={() => acknowledgeAlert(id)}
                style={{
                  marginTop: "6px",
                  fontSize: "12px",
                  background: "#111827",
                  color: "#e5e7eb",
                  border: "1px solid #374151",
                  cursor: "pointer"
                }}
              >
                Acknowledge
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
