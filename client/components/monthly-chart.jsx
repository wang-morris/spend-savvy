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

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

export default function MonthlyChart() {
  return (
    <PieChart className='pie-chart' width={320} height={200}>
      <Pie data={data} cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Legend />
    </PieChart>
  );
}
