import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";

import MapView from "./MapView";
import SensorTable from "./SensorTable";
import AlertsPanel from "./AlertsPanel";
import RechartsPanel from "./RechartsPanel";

export default function Dashboard() {
  const [sensors, setSensors] = useState({});
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    // 🔥 Sensors listener
    const sensorsRef = ref(db, "sensors");
    onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("🔥 FIREBASE SENSOR DATA:", data);
      setSensors(data || {});
    });

    // 🚨 Alerts listener
    const alertsRef = ref(db, "alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("🚨 FIREBASE ALERT DATA:", data);
      setAlerts(data || {});
    });
  }, []);

  return (
    <div className="dashboard grid grid-cols-12 gap-4 p-4">
      <div className="col-span-8">
        <MapView sensors={sensors} />
      </div>

      <div className="col-span-4">
        <AlertsPanel alerts={alerts} />
      </div>

      <div className="col-span-12">
        <SensorTable sensors={sensors} />
      </div>

      <div className="col-span-12">
        <RechartsPanel sensors={sensors} />
      </div>
    </div>
  );
}
