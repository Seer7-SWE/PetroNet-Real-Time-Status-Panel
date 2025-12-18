import React from "react";
import { calculateSensorConfidence } from "../utils/sensorConfidence";



export default function SensorTable({ sensors }) {
  if (!sensors || Object.keys(sensors).length === 0) {
    return <p>No sensor data available</p>;
  }

  return (
    <div className="card">
      <h2>Oil Field Sensors</h2>

      <table className="sensor-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>ID</th>
            <th>Temp (°C)</th>
            <th>Pressure</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Confidence</th>
          </tr>
        </thead>
        
        <tbody>
          {Object.values(sensors).map((s) => {
            const confidence = calculateSensorConfidence(s);

            const confidenceClass =
              confidence >= 80 ? "confidence-high" : confidence >=50 ? "confidence-medium" : "confidence-loe";
            return (
            <tr key={s.id}>
              <td>{s.field}</td>
               <td>{s.id}</td>
                <td>{s.temperature}</td>
              <td>{s.pressure}</td>
              <td>
              <span className={`badge ${s.status.toLowerCase()}`}>
                 {s.status}
                </span>
              </td>
              <td>{new Date(s.timestamp).toLocaleTimeString()}</td>
            <td className={confidenceClass}>{confidence}%</td>
            </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>

  );
}
