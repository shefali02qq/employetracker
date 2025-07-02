import React from 'react';

const statusColors = {
  Working: '#4caf50',
  Break: '#ff9800',
  Meeting: '#2196f3',
  Offline: '#9e9e9e'
};

function MemberCard({ member }) {
  const activeTasks = member.tasks.filter(t => !t.completed).length;
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <strong>{member.name}</strong>
        <span style={{ marginLeft: 10, padding: '2px 8px', borderRadius: 12, background: statusColors[member.status], color: '#fff', fontSize: 12 }}>
          {member.status}
        </span>
      </div>
      <div style={{ fontSize: 13, color: '#555' }}>Active Tasks: {activeTasks}</div>
    </div>
  );
}

export default MemberCard; 