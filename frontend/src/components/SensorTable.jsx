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
           {Object.values(sensors).map((s) => (
             <tr key={s.id}>
               <td>{s.id}</td>
               <td>{s.field}</td>
               <td>{s.temperature} °C</td>
               <td>{s.pressure} psi</td>
               <td style={{ color: s.status === "warning" ? "orange" : "green" }}>
                 {s.status}
              </td>
             </tr>
           ))}
          </tbody>

      </table>
    </div>
  );
}
