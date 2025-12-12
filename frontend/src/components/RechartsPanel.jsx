import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { time: 1, value: 10 },
  { time: 2, value: 22 },
  { time: 3, value: 18 },
];

export default function RechartsPanel() {
  return (
    <div>
      <h2>Trend</h2>
      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="value" stroke="#ff0000" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
