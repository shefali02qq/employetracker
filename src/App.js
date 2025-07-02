import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Team Pulse</h2>
        {/* Sidebar can be expanded for navigation if needed */}
      </aside>
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
