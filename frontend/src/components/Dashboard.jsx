import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";

import MapView from "./MapView";
import SensorTable from "./SensorTable";
import AlertsPanel from "./AlertsPanel";
import RechartsPanel from "./RechartsPanel";

export default function Dashboard() {
  const [sensors, setSensors] = useState({});
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
  const sensorsRef = ref(database, "sensors");
  const alertsRef = ref(database, "alerts");

  const unsubSensors = onValue(sensorsRef, snap => {
    setSensors(snap.val() || {});
  });

  const unsubAlerts = onValue(alertsRef, snap => {
    setAlerts(snap.val() || {});
  });

    return () => {
      unsubSensors();
      unsubAlerts();
    };
  }, []);


  return (
    <div className="scada-root">
      {/* TOP STATUS BAR */}
      <div className="scada-topbar">
         <h2>PetroNet — Saudi Oilfield Operations</h2>
         <span>Live Monitoring</span>
         <div className="status">
            <span className={Object.keys(alerts).length > 0 ? "critical" : "normal"}>
                   ● SYSTEM {Object.keys(alerts).length > 0 ? "DEGRADED" : "NORMAL"}
            </span>
         </div>
      </div>

      {/* MAIN GRID */}
      <div className="scada-grid">
        <div className="panel map">
          <MapView sensors={sensors} />
        </div>

        <div className="panel alerts">
          <AlertsPanel alerts={alerts} />
        </div>

        <div className="panel table">
          <SensorTable sensors={sensors} />
        </div>
        <div className="panel charts">
            <RechartsPanel sensors={sensors} />
        </div>
      </div>
    </div>
  );
}
