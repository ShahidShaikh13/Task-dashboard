const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.route('/')
  .post(protect, createTask)     // Create task
  .get(protect, getTasks);        // Get all tasks for user

router.route('/:id')
  .get(protect, getTaskById)     // Get task by ID
  .put(protect, updateTask)      // Update task
  .delete(protect, deleteTask);  // Delete task

module.exports = router;

/*
Explanation:
- Defines RESTful routes for Task resource.
- Uses 'protect' middleware to secure routes.
- Connects routes to controller functions.
*/ 