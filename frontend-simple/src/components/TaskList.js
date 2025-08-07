import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateTask from './CreateTask';
import EditTask from './EditTask';
import TaskFilter from './TaskFilter';
import TaskAssignment from './TaskAssignment';

const TaskList = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [assigningTask, setAssigningTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: 'createdAt'
  });

  useEffect(() => {
    fetchTasks();
    fetchTeams();
  }, []);

  useEffect(() => {
    filterAndSortTasks();
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };

  const filterAndSortTasks = useCallback(() => {
    let filtered = [...tasks];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Sort
    filtered.sort((a, b) => {
      if (filters.sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (filters.sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (filters.sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (filters.sortBy === 'status') {
        const statusOrder = { 'in progress': 2, pending: 1, done: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    if (window.showNotification) {
      window.showNotification('Task created successfully!', 'success');
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setEditingTask(null);
    if (window.showNotification) {
      window.showNotification('Task updated successfully!', 'success');
    }
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(prev => prev.filter(task => task._id !== taskId));
    if (window.showNotification) {
      window.showNotification('Task deleted successfully!', 'success');
    }
  };

  const handleTaskAssigned = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setAssigningTask(null);
    if (window.showNotification) {
      window.showNotification('Task assigned successfully!', 'success');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleAssignTask = (task) => {
    setAssigningTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}`);
        handleTaskDeleted(taskId);
      } catch (err) {
        if (window.showNotification) {
          window.showNotification('Failed to delete task', 'error');
        }
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="container">Loading tasks...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div>
      <header className="App-header">
        <h1>Task Management</h1>
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
        <h2>Your Tasks</h2>
        
        {/* Create Task Form */}
        <CreateTask onTaskCreated={handleTaskCreated} />
        
        {/* Filter Section */}
        <TaskFilter filters={filters} onFilterChange={handleFilterChange} />
        
        {/* Task List */}
        <div style={{ marginTop: '30px' }}>
          <h3>Task List ({filteredTasks.length} of {tasks.length} tasks)</h3>
          
          {filteredTasks.length === 0 ? (
            <div className="card">
              <p>No tasks found. {tasks.length > 0 ? 'Try adjusting your filters.' : 'Create your first task above!'}</p>
            </div>
          ) : (
            <div>
              {filteredTasks.map(task => (
                <div key={task._id} className="task-item">
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <div className="task-actions">
                      <button 
                        onClick={() => handleAssignTask(task)}
                        className="btn btn-info btn-sm"
                      >
                        Assign
                      </button>
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p>{task.description}</p>
                  <p><strong>Status:</strong> <span className={`status-${task.status.replace(' ', '-')}`}>{task.status}</span></p>
                  <p><strong>Priority:</strong> <span className={`priority-${task.priority}`}>{task.priority}</span></p>
                  {task.dueDate && (
                    <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  )}
                  {task.team && (
                    <p><strong>Team:</strong> {task.team.name}</p>
                  )}
                  {task.assignedTo && (
                    <p><strong>Assigned to:</strong> {task.assignedTo.name}</p>
                  )}
                  <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTask 
          task={editingTask}
          onTaskUpdated={handleTaskUpdated}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {/* Assign Task Modal */}
      {assigningTask && (
        <TaskAssignment 
          task={assigningTask}
          teams={teams}
          onTaskAssigned={handleTaskAssigned}
          onCancel={() => setAssigningTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList; 