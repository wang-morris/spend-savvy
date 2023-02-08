import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const data = [
  { month: 'Jan', spending: 2000 },
  { month: 'Feb', spending: 2500 },
  { month: 'Mar', spending: 1750 },
  { month: 'Apr', spending: 3000 },
  { month: 'May', spending: 2000 },
  { month: 'Jun', spending: 3000 },
  { month: 'Jul', spending: 2020 },
  { month: 'Aug', spending: 2700 },
  { month: 'Sep', spending: 2000 },
  { month: 'Oct', spending: 2500 },
  { month: 'Nov', spending: 3000 },
  { month: 'Dec', spending: 2009 }
];

export default function BarGraph(props) {
  return (
    <ResponsiveContainer width="95%" height="90%">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="spending" fill="#8884d8"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
