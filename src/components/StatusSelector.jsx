import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStatus } from '../redux/slices/membersSlice';

const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

function StatusSelector() {
  const { currentUser } = useSelector(state => state.role);
  const members = useSelector(state => state.members.members);
  const member = members.find(m => m.name === currentUser);
  const dispatch = useDispatch();

  if (!member) return null;

  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
      {statuses.map(status => (
        <button
          key={status}
          onClick={() => dispatch(updateStatus({ memberId: member.id, status }))}
          style={{
            padding: '6px 14px',
            borderRadius: 4,
            border: member.status === status ? '2px solid #2196f3' : '1px solid #bbb',
            background: member.status === status ? '#e3f2fd' : '#f0f0f0',
            cursor: 'pointer',
            fontWeight: member.status === status ? 'bold' : 'normal'
          }}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default StatusSelector; 