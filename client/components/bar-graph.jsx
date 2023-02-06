import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const data = [
  { month: 'Jan', amountSpent: 3000 },
  { month: 'Feb', amountSpent: 2050 },
  { month: 'Mar', amountSpent: 1000 },
  { month: 'Apr', amountSpent: 1750 },
  { month: 'May', amountSpent: 2850 },
  { month: 'Jun', amountSpent: 1350 },
  { month: 'Jul', amountSpent: 2400 },
  { month: 'Aug', amountSpent: 1000 },
  { month: 'Sep', amountSpent: 1750 },
  { month: 'Oct', amountSpent: 1850 },
  { month: 'Nov', amountSpent: 2300 },
  { month: 'Dec', amountSpent: 2400 }
];

export default function BarGraph(props) {
  return (
    <BarChart height={300} width={300} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='month' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='YTD' fill='#8884d8' />
    </BarChart>
  );
}
