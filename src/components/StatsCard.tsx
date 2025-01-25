import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change: string;
}

export default function StatsCard({ title, value, icon, change }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-green-50 rounded-lg">{icon}</div>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}