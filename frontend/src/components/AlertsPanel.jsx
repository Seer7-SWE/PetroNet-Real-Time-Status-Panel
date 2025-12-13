import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";


export default function AlertsPanel({ alerts }) {
  if (!alerts || Object.keys(alerts).length === 0) {
    return <p className="text-gray-500">No active alerts</p>;
  }

  return (
    <div className="space-y-2">
      {Object.values(alerts).map((a) => (
        <div
          key={a.timestamp}
          className="p-3 rounded bg-red-100 border border-red-300"
        >
          <p className="font-bold">{a.severity}</p>
          <p>{a.message}</p>
          <p className="text-sm text-gray-500">{a.sensorId}</p>
        </div>
      ))}
    </div>
  );
}
