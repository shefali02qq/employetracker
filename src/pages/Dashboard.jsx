import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';

const statusList = ['Working', 'Break', 'Meeting', 'Offline'];

function Dashboard() {
  const { currentRole, currentUser } = useSelector(state => state.role);
  const members = useSelector(state => state.members.members);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState(false);

  // For summary
  const statusSummary = statusList.map(status => {
    const count = members.filter(m => m.status === status).length;
    return count > 0 ? `${count} ${status}` : null;
  }).filter(Boolean).join(' · ');

  // Filtering and sorting
  let filteredMembers = filter === 'All' ? members : members.filter(m => m.status === filter);
  if (sort) {
    filteredMembers = [...filteredMembers].sort((a, b) => {
      const aActive = a.tasks.filter(t => !t.completed).length;
      const bActive = b.tasks.filter(t => !t.completed).length;
      return bActive - aActive;
    });
  }

  // Team Member's own data
  const member = members.find(m => m.name === currentUser);

  return (
    <div className="dashboard-container">
      <Header />
      {currentRole === 'lead' ? (
        <>
          <div className="dashboard-section">
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Team Member Status Monitor</div>
            <div style={{ marginBottom: 8, fontSize: 14 }}>{statusSummary}</div>
            <div style={{ marginBottom: 8 }}>
              <label>Status Filter: </label>
              <select value={filter} onChange={e => setFilter(e.target.value)} style={{ marginRight: 10 }}>
                <option value="All">All</option>
                {statusList.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <label><input type="checkbox" checked={sort} onChange={e => setSort(e.target.checked)} /> Sort by Active Tasks</label>
            </div>
            {filteredMembers.map(m => <MemberCard key={m.id} member={m} />)}
          </div>
          <div className="dashboard-section">
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Assign Task</div>
            <TaskForm />
          </div>
        </>
      ) : (
        <>
          <div className="dashboard-section">
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Update Your Status</div>
            <StatusSelector />
          </div>
          <div className="dashboard-section">
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Your Tasks</div>
            {member && <TaskList tasks={member.tasks} memberId={member.id} />}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard; 