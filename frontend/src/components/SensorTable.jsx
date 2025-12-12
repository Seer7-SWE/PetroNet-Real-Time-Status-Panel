import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function SensorTable() {
  const [sensors, setSensors] = useState({});

  useEffect(() => {
    const sensorRef = ref(db, "sensors/");
    onValue(sensorRef, (snapshot) => {
      setSensors(snapshot.val() || {});
    });
  }, []);

  return (
    <div>
      <h2>Sensors</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Lat</th>
            <th>Lng</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sensors).map(([id, val]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{val.value}</td>
              <td>{val.lat}</td>
              <td>{val.lng}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
