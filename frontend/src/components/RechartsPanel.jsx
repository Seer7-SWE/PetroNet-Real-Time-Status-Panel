import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { time: 1, value: 10 },
  { time: 2, value: 22 },
  { time: 3, value: 18 },
];

export default function RechartsPanel({ sensors }) {
  if (!sensors || Object.keys(sensors).length === 0) {
    return <p className="text-gray-500">No chart data</p>;
  }

  const data = Object.values(sensors).map((s) => ({
    name: s.field,
    temperature: s.temperature,
    pressure: s.pressure
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" />
        <Line type="monotone" dataKey="pressure" />
      </LineChart>
    </ResponsiveContainer>
  );
}

