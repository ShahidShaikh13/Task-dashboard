const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Team', TeamSchema);

/*
Explanation:
- Defines Team schema with members and owner references.
- Owner is the user who created the team.
- Members is an array of user IDs.
- Tracks createdAt and updatedAt.
*/ 