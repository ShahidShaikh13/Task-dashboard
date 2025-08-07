# Task & Team Management API
<img width="1512" height="602" alt="Screenshot 2025-08-07 at 12 08 28 PM" src="https://github.com/user-attachments/assets/a036e024-6a40-4ca4-a1f4-045a10a1b042" />

A full-stack task and team management application with JWT authentication, built with Node.js, Express, MongoDB, and React.
<img width="1507" height="851" alt="Screenshot 2025-08-07 at 12 08 00 PM" src="https://github.com/user-attachments/assets/602f7b80-14c8-402a-96fb-5fa0f6d4fc7e" />

<img width="1506" height="856" alt="Screenshot 2025-08-07 at 12 08 16 PM" src="https://github.com/user-attachments/assets/d5772a39-8630-4ced-b7af-0b0718730ca3" />



## 📁 Project Structure

```
task-team-management-api/
├── backend/              # Node.js Express API
│   ├── controllers/      # API logic
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & validation
│   ├── utils/           # Helper functions
│   ├── config/          # Configuration files
│   └── server.js        # Main server file
├── frontend-simple/     # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── public/          # Static files
└── README.md            # This file
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://shahus6003:PP08LUoVTc9A1uAT@shahidshaikh13.fmuzhpw.mongodb.net/taskteamdb?retryWrites=true&w=majority&appName=ShahidShaikh13
   JWT_SECRET=mysecretkey123456789
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend-simple
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3001`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Teams
- `GET /api/teams` - Get user's teams
- `POST /api/teams` - Create new team
- `GET /api/teams/:id` - Get specific team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

## 🔧 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - Frontend framework
- **Axios** - HTTP client
- **React Router** - Navigation

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon
```

### Frontend Development
```bash
cd frontend-simple
npm start    # Start React development server
```

## 📝 Features

- ✅ User authentication with JWT
- ✅ Task management (CRUD operations)
- ✅ Team management (CRUD operations)
- ✅ Secure password hashing
- ✅ Protected routes
- ✅ MongoDB integration
- ✅ RESTful API design
- ✅ React frontend with routing
- ✅ Real-time data fetching

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Vercel, or AWS
- Set environment variables
- Connect to MongoDB Atlas

### Frontend Deployment
- Deploy to Vercel, Netlify, or AWS
- Connect to backend API

## 📄 License

MIT License 
