require('dotenv').config(); // Load env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies from requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Test routes
const testRoutes = require('./routes/test');
app.use('/api/test', testRoutes);

// Task routes
const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes);

// Team routes
const teamRoutes = require('./routes/team');
app.use('/api/teams', teamRoutes);

// Test route to check if server is running
app.get('/', (req, res) => {
  res.send('API running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
Explanation:
- Import necessary modules and initialize express app.
- Setup middleware for CORS and JSON parsing.
- Connect to MongoDB using mongoose.
- Mount auth routes under /api/auth path.
- Mount test routes under /api/test path.
- Mount task routes under /api/tasks path.
- Mount team routes under /api/teams path.
- Add a simple root route for testing.
- Start the server on configured port.
*/
