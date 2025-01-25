import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', cups: 45 },
  { name: 'Tue', cups: 52 },
  { name: 'Wed', cups: 38 },
  { name: 'Thu', cups: 65 },
  { name: 'Fri', cups: 48 },
  { name: 'Sat', cups: 25 },
  { name: 'Sun', cups: 32 },
];

export default function ImpactTracker() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Impact</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cups" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}