
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { temperature, pressure, id } = payload[0].payload;

  return (
    <div
      style={{
        background: "#020617",
        border: "1px solid #1f2933",
        borderRadius: "6px",
        padding: "10px 12px",
        boxShadow: "0 0 12px rgba(0,0,0,0.6)",
      }}
    >
      
      <div style={{ color: "#e5e7eb", fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
        {id}
      </div>

      
      <div style={{ color: "#f97316", fontSize: 15 }}>
        temperature : {temperature.toFixed(2)}°C
      </div>

      
      <div style={{ color: "#00BFFF", fontSize: 15 }}>
        pressure : {pressure.toFixed(2)} psi
      </div>
    </div>
  );
};

export default function TempPressureScatter({ sensors }) {
  if (!sensors || Object.keys(sensors).length === 0) {
    return (
      <div className="panel">
        <h3>Pressure vs Temperature</h3>
        <p style={{ opacity: 0.6 }}>No sensor data available</p>
      </div>
    );
  }

  
  const data = Object.values(sensors)
    .filter(
      s => Number.isFinite(s.temperature) && Number.isFinite(s.pressure)
    )
    .map(s => ({
      temperature: Number(s.temperature),
      pressure: Number(s.pressure),
      id: s.field || "Unknown Field",
      status: s.status || "NORMAL",
    }));

  if (data.length === 0) {
    return (
      <div className="panel">
        <h3>Pressure vs Temperature</h3>
        <p style={{ opacity: 0.6 }}>No valid temperature/pressure pairs</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3>Pressure vs Temperature Correlation</h3>

      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#1f2933" />

            <XAxis
              type="number"
              dataKey="temperature"
              name="Temperature"
              unit="°C"
              tick={{ fill: "#9ca3af" }}
            />

            <YAxis
              type="number"
              dataKey="pressure"
              name="Pressure"
              tick={{ fill: "#9ca3af" }}
            />

            <Tooltip
              cursor={{ stroke: "#64748b", strokeDasharray: "3 3" }}
              content={<CustomTooltip />}
            />

            <Scatter
              data={data}
              fill="#22c55e"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

