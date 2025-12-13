import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";


export default function SensorTable({ sensors }) {
  if (!sensors || Object.keys(sensors).length === 0) {
    return <p className="text-gray-500">No sensor data available</p>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>ID</th>
          <th>Field</th>
          <th>Status</th>
          <th>Temp</th>
          <th>Pressure</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(sensors).map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.field}</td>
            <td>{s.status}</td>
            <td>{s.temperature}°C</td>
            <td>{s.pressure}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



// export default function SensorTable() {
//   const [sensors, setSensors] = useState({});

//   useEffect(() => {
//     const sensorRef = ref(db, "sensors/");
//     onValue(sensorRef, (snapshot) => {
//       setSensors(snapshot.val() || {});
//     });
//   }, []);

//   if (!sensors || Object.keys(sensors).length === 0) {
//     return <p className="text-gray-400">No sensor data available</p>;
//   }

//   return (
//     <div>
//       <h2>Sensors</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Value</th>
//             <th>Lat</th>
//             <th>Lng</th>
//           </tr>
//         </thead>
//         <tbody>
//            {Object.values(sensors).map((s) => (
//              <tr key={s.id}>
//                <td>{s.id}</td>
//                <td>{s.field}</td>
//                <td>{s.temperature} °C</td>
//                <td>{s.pressure} psi</td>
//                <td style={{ color: s.status === "warning" ? "orange" : "green" }}>
//                  {s.status}
//               </td>
//              </tr>
//            ))}
//           </tbody>

//       </table>
//     </div>
//   );
// }
