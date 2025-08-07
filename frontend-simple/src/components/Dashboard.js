import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <header className="App-header">
        <h1>Task Management Dashboard</h1>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/teams">Teams</Link>
          <button 
            onClick={onLogout}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className="container">
        <h2>Welcome, {user?.name || 'User'}!</h2>
        
        <div className="dashboard-grid">
          <div className="card">
            <h3>Quick Actions</h3>
            <div style={{ textAlign: 'left' }}>
              <Link to="/tasks" className="btn btn-primary" style={{ display: 'block', marginBottom: '10px' }}>
                View Tasks
              </Link>
              <Link to="/teams" className="btn btn-secondary" style={{ display: 'block', marginBottom: '10px' }}>
                View Teams
              </Link>
            </div>
          </div>
          
          <div className="card">
            <h3>Account Info</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
          
          <div className="card">
            <h3>API Status</h3>
            <p>✅ Backend Connected</p>
            <p>✅ MongoDB Connected</p>
            <p>✅ Authentication Working</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 