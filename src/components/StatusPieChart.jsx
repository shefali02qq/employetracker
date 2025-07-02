import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusColors = {
  Working: '#4caf50',
  Break: '#ff9800',
  Meeting: '#2196f3',
  Offline: '#9e9e9e'
};

function StatusPieChart({ members }) {
  const statusList = ['Working', 'Break', 'Meeting', 'Offline'];
  const counts = statusList.map(status =>
    members.filter(m => m.status === status).length
  );

  const data = {
    labels: statusList,
    datasets: [
      {
        data: counts,
        backgroundColor: statusList.map(status => statusColors[status]),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
}

export default StatusPieChart; 