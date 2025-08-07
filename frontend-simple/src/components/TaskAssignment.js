import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskAssignment = ({ task, teams, onTaskAssigned, onCancel }) => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task.team) {
      setSelectedTeam(task.team._id || task.team);
    }
  }, [task]);

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    setSelectedMember(''); // Reset member selection when team changes
  };

  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updateData = {
        team: selectedTeam || null,
        assignedTo: selectedMember || null
      };

      const response = await axios.put(`/api/tasks/${task._id}`, updateData);
      onTaskAssigned(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to assign task');
    } finally {
      setLoading(false);
    }
  };

  const selectedTeamData = teams.find(team => team._id === selectedTeam);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Assign Task: {task.title}</h3>
          <button onClick={onCancel} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="team">Team</label>
            <select
              id="team"
              name="team"
              value={selectedTeam}
              onChange={handleTeamChange}
            >
              <option value="">No Team</option>
              {teams.map(team => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          
          {selectedTeam && selectedTeamData && (
            <div className="form-group">
              <label htmlFor="member">Assign to Member</label>
              <select
                id="member"
                name="member"
                value={selectedMember}
                onChange={handleMemberChange}
              >
                <option value="">Unassigned</option>
                {selectedTeamData.members?.map(member => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Assigning...' : 'Assign Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskAssignment; 