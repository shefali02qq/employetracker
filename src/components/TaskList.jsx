import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskProgress } from '../redux/slices/membersSlice';

function TaskList({ tasks, memberId }) {
  const dispatch = useDispatch();

  const handleProgress = (taskId, change) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    let newProgress = Math.max(0, Math.min(100, task.progress + change));
    dispatch(updateTaskProgress({ memberId, taskId, progress: newProgress }));
  };

  return (
    <div>
      {tasks.length === 0 && <div style={{ color: '#888', fontSize: 14 }}>No tasks assigned.</div>}
      {tasks.map(task => (
        <div key={task.id} style={{ border: '1px solid #eee', borderRadius: 5, padding: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 'bold' }}>{task.title}</div>
          <div style={{ fontSize: 13, color: '#555' }}>Due: {task.dueDate}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <button onClick={() => handleProgress(task.id, -10)} disabled={task.progress === 0 || task.completed} style={{ padding: '2px 8px' }}>-</button>
            <div style={{ flex: 1, background: '#eee', borderRadius: 4, height: 10, position: 'relative' }}>
              <div style={{ width: `${task.progress}%`, background: '#4caf50', height: '100%', borderRadius: 4 }}></div>
            </div>
            <button onClick={() => handleProgress(task.id, 10)} disabled={task.progress === 100 || task.completed} style={{ padding: '2px 8px' }}>+</button>
            <span style={{ marginLeft: 8, fontSize: 13 }}>{task.progress}%</span>
            {task.completed && <span style={{ color: '#4caf50', marginLeft: 8, fontWeight: 'bold' }}>Completed</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList; 