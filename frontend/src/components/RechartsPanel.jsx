// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// export default function RechartsPanel({ sensors }) {
//   if (!sensors) return null;

//   const chartData = Object.values(sensors).map((s) => ({
//     name: s.field,
//     temperature: s.temperature,
//     pressure: s.pressure,
//   }));

//   return (
//     <div className="card">
//       <h2>Temperature vs Pressure</h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip contentStyle={{
//               backgroundColor: "#020617",
//               border: "1px solid #1f2933",
//               color: "#e5e7eb",
//             }} />
//           <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
//           <Line type="monotone" dataKey="pressure" stroke="#387908" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// export default function RechartsPanel({ sensors }) {
//   if (!sensors) return null;

//   const chartData = Object.values(sensors).map((s) => ({
//     name: s.field,
//     temperature: s.temperature,
//     pressure: s.pressure,
//   }));

//   return (
//     <div className="panel charts">
//       <h2>Temperature vs Pressure</h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <XAxis
//             dataKey="name"
//             stroke="#e5e7eb"
//             tick={{ fill: "#e5e7eb", fontSize: 12 }}
//           />
//           <YAxis
//             stroke="#9ca3af"
//             tick={{ fill: "#9ca3af", fontSize: 12 }}
//           />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#020617",
//               border: "1px solid #1f2933",
//               color: "#e5e7eb",
//             }}
//             labelStyle={{ color: "#e5e7eb", fontWeight: "bold" }}
//             itemStyle={{ color: "#e5e7eb" }}
//           />

//           {/* <Tooltip
//              contentStyle={{
//                 backgroundColor: "#020617",
//                 border: "1px solid #1f2933",
//              }}
//              labelStyle={{ color: "#e5e7eb", fontWeight: "bold" }}
//              formatter={(value, name) => {
//              const color =
//                 name === "temperature" ? "#f97316" : // orange
//                 name === "pressure" ? "#22c55e" :     // green
//                  "#e5e7eb";

//               return [
//                 <span style={{ color }}>
//                    {value}
//                 </span>,
//                <span style={{ color }}>
//                   {name}
//                 </span>
//                ];
//               }}
//           /> */}

//                {/* <Tooltip
//                    wrapperStyle={{ outline: "none" }}
//                    contentStyle={{
//                     backgroundColor: "#020617",
//                     border: "1px solid #1f2933",
//                   }}
//                   labelStyle={{ color: "#e5e7eb", fontWeight: "bold" }}
//                   formatter={(value, name) => {
//                     const colorMap = {
//                       temperature: "#f97316", // orange
//                       pressure: "#22c55e",    // green
//                      };

//                       const color = colorMap[name] || "#e5e7eb";

//              return [
//                  <span style={{ color, fontWeight: 500 }}>
//                   {value}
//                  </span>,
//                  <span style={{ color, fontWeight: 500 }}>
//                  {name}
//                  </span>
//              ];
//             }}
//           /> */}


//           <Line
//             type="monotone"
//             dataKey="temperature"
//             stroke="#ff7300"
            
//             dot={true}
            
//           />
//           <Line
//             type="monotone"
//             dataKey="pressure"
//             stroke="#22c55e"
            
//             dot={true}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
