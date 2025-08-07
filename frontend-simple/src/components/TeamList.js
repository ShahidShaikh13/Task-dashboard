import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateTeam from './CreateTeam';
import EditTeam from './EditTeam';

const TeamList = ({ user, onLogout }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamCreated = (newTeam) => {
    setTeams(prev => [newTeam, ...prev]);
  };

  const handleTeamUpdated = (updatedTeam) => {
    setTeams(prev => prev.map(team => 
      team._id === updatedTeam._id ? updatedTeam : team
    ));
    setEditingTeam(null);
  };

  const handleTeamDeleted = (teamId) => {
    setTeams(prev => prev.filter(team => team._id !== teamId));
  };

  const handleEditTeam = (team) => {
    setEditingTeam(team);
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await axios.delete(`/api/teams/${teamId}`);
        handleTeamDeleted(teamId);
      } catch (err) {
        alert('Failed to delete team');
      }
    }
  };

  if (loading) return <div className="container">Loading teams...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div>
      <header className="App-header">
        <h1>Team Management</h1>
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
        <h2>Your Teams</h2>
        
        {/* Create Team Form */}
        <CreateTeam onTeamCreated={handleTeamCreated} />
        
        {/* Team List */}
        <div style={{ marginTop: '30px' }}>
          <h3>Team List ({teams.length} teams)</h3>
          
          {teams.length === 0 ? (
            <div className="card">
              <p>No teams found. Create your first team above!</p>
            </div>
          ) : (
            <div>
              {teams.map(team => (
                <div key={team._id} className="team-item">
                  <div className="task-header">
                    <h4>{team.name}</h4>
                    <div className="task-actions">
                      <button 
                        onClick={() => handleEditTeam(team)}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTeam(team._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p>{team.description}</p>
                  <p><strong>Owner:</strong> {team.owner?.name || 'Unknown'}</p>
                  <p><strong>Members:</strong> {team.members?.length || 0} members</p>
                  <p><strong>Created:</strong> {new Date(team.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Team Modal */}
      {editingTeam && (
        <EditTeam 
          team={editingTeam}
          onTeamUpdated={handleTeamUpdated}
          onCancel={() => setEditingTeam(null)}
        />
      )}
    </div>
  );
};

export default TeamList; 