# SmartLearning_Website


🚀 Features

👨‍🎓 Student

Secure login and authentication

Access learning materials uploaded by instructors

View resources in an organized manner


👩‍🏫 Instructor

Secure login with role-based access

Upload and manage learning resources

Control content visibility for students


🔐 Authentication & Security

Role-based authentication (Student / Instructor)

Protected routes for secure access




---

🛠 Tech Stack

Frontend

React.js

HTML5

CSS3

JavaScript


Backend

Node.js

Express.js

RESTful APIs


Database

MongoDB (Mongoose)


📂 Project Structure

SmartLearning_Website/
├── client/        # React frontend
├── server/        # Node.js & Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── .env
├── package.json
└── README.md


---

⚙️ Installation & Setup

Prerequisites

Node.js

MongoDB

Git


Steps

# Clone the repository
git clone https://github.com/GonelaAbhi/SmartLearning_Website.git

# Navigate to project folder
cd SmartLearning_Website

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install


---

▶️ Running the Application

# Start backend server
cd server
npm start

# Start frontend server
cd ../client
npm start

The application will run at:

Frontend: http://localhost:3000

Backend: http://localhost:3001



---

🔑 Environment Variables

Create a .env file inside the server directory:

PORT=3001
MONGO_URI=your_mongodb_connection_string
