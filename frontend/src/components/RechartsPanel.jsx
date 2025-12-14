import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RechartsPanel({ sensors }) {
  if (!sensors) return null;

  const chartData = Object.values(sensors).map((s) => ({
    name: s.field,
    temperature: s.temperature,
    pressure: s.pressure,
  }));

  return (
    <div className="card">
      <h2>Temperature vs Pressure</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
          <Line type="monotone" dataKey="pressure" stroke="#387908" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
