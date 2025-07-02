import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';

function TaskForm() {
  const members = useSelector(state => state.members.members);
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!memberId || !title || !dueDate) return;
    dispatch(assignTask({ memberId: Number(memberId), title, dueDate }));
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
      <select value={memberId} onChange={e => setMemberId(e.target.value)} style={{ padding: 4 }}>
        {members.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
      <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: 4 }} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ padding: 4 }} />
      <button type="submit" style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #bbb', background: '#f0f0f0', cursor: 'pointer' }}>Assign</button>
    </form>
  );
}

export default TaskForm; 