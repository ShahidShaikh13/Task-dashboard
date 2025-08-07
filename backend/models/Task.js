const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'done'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // User who created the task
    required: true,
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Task', TaskSchema);

/*
Explanation:
- Defines a schema for Task with all relevant fields.
- Includes references to User model for assignedTo and createdBy.
- Includes reference to Team model for team association.
- Uses enums for status and priority to limit possible values.
- Automatically tracks creation and update timestamps.
*/ 