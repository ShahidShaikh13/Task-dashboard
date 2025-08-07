const Team = require('../models/Team');

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
exports.createTeam = async (req, res) => {
  const { name, description, members } = req.body;

  try {
    const team = new Team({
      name,
      description,
      members,
      owner: req.user._id,
    });

    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all teams user belongs to
// @route   GET /api/teams
// @access  Private
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      members: req.user._id,
    }).populate('members', 'name email').populate('owner', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get team by ID
// @route   GET /api/teams/:id
// @access  Private
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members', 'name email')
      .populate('owner', 'name email');
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update team info
// @route   PUT /api/teams/:id
// @access  Private
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      const { name, description, members } = req.body;
      team.name = name || team.name;
      team.description = description || team.description;
      team.members = members || team.members;

      const updatedTeam = await team.save();
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a team
// @route   DELETE /api/teams/:id
// @access  Private
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      await team.remove();
      res.json({ message: 'Team removed' });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/*
Explanation:
- Implements CRUD for Team.
- Populates members and owner info for detailed responses.
- Only accessible by authenticated users.
*/ 