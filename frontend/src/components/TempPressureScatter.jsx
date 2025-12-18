import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import { calculateSensorConfidence } from "../utils/sensorConfidence";

const severityColor = {
  NORMAL: "#22c55e",    // green
  HIGH: "#facc15",      // yellow
  CRITICAL: "#ef4444"   // red
};

export default function TempPressureScatter({ sensors }) {
  if (!sensors) return null;

//   const data = Object.values(sensors)
//   .map((s) => ({
//     id: s.id,
//     field: s.field,
//     temperature: Number(s.temperature),
//     pressure: Number(s.pressure),
//     status: s.status,
//     confidence: calculateSensorConfidence(s)
//   }))
//   .filter(
//     (d) =>
//       Number.isFinite(d.temperature) &&
//       Number.isFinite(d.pressure)
//   );

  const scatterData = Object.values(sensors || {})
  .filter(s => s.temperature != null && s.pressure != null)
  .map(s => ({
    x: Number(s.temperature),
    y: Number(s.pressure),
    id: s.id,
    status: s.status,
    confidence: s.confidence ?? 100
  }));



  return (
    <div className="panel">
      <h3>Pressure vs Temperature Correlation</h3>

      <div className="scatter-wrapper" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid stroke="#1f2933" />

            <XAxis
              type="number"
              dataKey="temperature"
              name="Temperature"
              unit="°C"
              tick={{ fill: "#9ca3af" }}
              domain={["auto", "auto"]}
            />

            <YAxis
              type="number"
              dataKey="pressure"
              name="Pressure"
              tick={{ fill: "#9ca3af" }}
              domain={["auto", "auto"]}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                background: "#020617",
                border: "1px solid #1f2933",
                color: "#e5e7eb"
              }}
              formatter={(value, name, props) => {
                if (name === "confidence") return [`${value}%`, "Confidence"];
                return [value, name];
              }}
              labelFormatter={(_, payload) =>
                payload?.[0]
                  ? `Sensor ${payload[0].payload.id} (${payload[0].payload.field})`
                  : ""
              }
            />

            <Legend />

            {["NORMAL", "HIGH", "CRITICAL"].map((sev) => (
              <Scatter
                key={sev}
                name={sev}
                data={scatterData.filter((d) => d.status === sev)}
                fill={severityColor[sev]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
