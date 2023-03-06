import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Housing', value: 1400 },
  { name: 'Food & Drink', value: 500 },
  { name: 'Bills & Utilities', value: 100 },
  { name: 'Transportation', value: 200 },
  { name: 'Shopping', value: 150 },
  { name: 'Entertainment', value: 150 },
  { name: 'Health', value: 35 },
  { name: 'Other', value: 100 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B0E0E6', '#ADD8E6', '#90EE90', '#FF69B4'];

export default function MonthlyChart() {
  return (
    <PieChart className='pie-chart' width={400} height={400}>
      <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Legend />
    </PieChart>
  );
}
