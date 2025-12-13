import React from "react";
import MapView from "./MapView";
import SensorTable from "./SensorTable";
import AlertsPanel from "./AlertsPanel";
import RechartsPanel from "./RechartsPanel";


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
