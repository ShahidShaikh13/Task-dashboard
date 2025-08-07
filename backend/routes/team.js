const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');

router.route('/')
  .post(protect, createTeam)
  .get(protect, getTeams);

router.route('/:id')
  .get(protect, getTeamById)
  .put(protect, updateTeam)
  .delete(protect, deleteTeam);

module.exports = router;

/*
Explanation:
- RESTful routes for Team resource.
- Protected by JWT middleware.
*/ 