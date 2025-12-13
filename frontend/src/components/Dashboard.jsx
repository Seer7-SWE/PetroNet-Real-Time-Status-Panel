import React from "react";
import MapView from "./MapView";
import SensorTable from "./SensorTable";
import AlertsPanel from "./AlertsPanel";
import RechartsPanel from "./RechartsPanel";


onValue(sensorsRef, (snapshot) => {
  const data = snapshot.val();
  console.log("🔥 FIREBASE SENSOR DATA:", data);
  setSensors(data || {});
});

export default function Dashboard() {
  return (
    <div className="dashboard">
      <MapView />
      <SensorTable />
      <AlertsPanel />
      <RechartsPanel />
    </div>
  );
}
