import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";


export default function AlertsPanel() {
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const alertsRef = ref(database, "alerts/");
    onValue(alertsRef, (snapshot) => {
      setAlerts(snapshot.val() || {});
    });
  }, []);

  return (
    <div>
      <h2>Alerts</h2>
      <ul>
        {Object.values(alerts).map((a, i) => (
          <li key={i}>{a.message}</li>
        ))}
      </ul>
    </div>
  );
}
