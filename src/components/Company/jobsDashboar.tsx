import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { jobPostings } from '@/utils/mockvagas';

const JobsDashboard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Vagas Postadas nos Últimos Meses</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={jobPostings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jobs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobsDashboard;

