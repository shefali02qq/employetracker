import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';

function Header() {
  const { currentRole, currentUser } = useSelector(state => state.role);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(switchRole(currentRole === 'lead' ? 'member' : 'lead'));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <div>
        <strong>User:</strong> {currentUser} <span style={{ marginLeft: 12 }}><strong>Role:</strong> {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}</span>
      </div>
      <button onClick={handleToggle} style={{ padding: '6px 14px', borderRadius: 4, border: '1px solid #bbb', background: '#f0f0f0', cursor: 'pointer' }}>
        Switch to {currentRole === 'lead' ? 'Member' : 'Lead'} Mode
      </button>
    </div>
  );
}

export default Header; 