# 🚀 FocusFlow Backend (API Server)

FocusFlow Backend is a scalable RESTful API built using the MERN stack with JavaScript.  
It powers authentication, task management  for the FocusFlow productivity platform.

---

## 🧠 Tech Stack

- Node.js
- Express.js
- JavaScript
- MongoDB (Mongoose ODM)
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 🏗 Architecture

- MVC Pattern
- Middleware-based Authentication
- Centralized Error Handling
- Environment-based Configuration

---

## 📦 Features

- 🔐 Secure Authentication (Register / Login)
- 🛡 JWT-based Authorization Middleware
- 📋 Task CRUD Operations
- 🧾 Typed Request/Response Models
- 🌍 Production Deployment on Render

---

Interactive documentation allows:
- Testing endpoints directly
- Viewing request/response schemas
- Understanding authentication headers

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

---

## 🛠 Installation & Setup (Local Development)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/focusflow-backend.git
cd focusflow-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run in Development Mode

```bash
npm run dev
```

(Uses ts-node-dev or nodemon)

---

## 🏭 Production Build
### Start Production Server

```bash
npm start
```

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. JWT generated upon login
3. Token sent in `Authorization: Bearer <token>`
4. Auth middleware verifies token
5. Protected routes accessible only with valid JWT

---

## 📌 Sample Endpoints

### Auth Routes

| Method | Endpoint              | Description        |
|--------|-----------------------|-------------------|
| POST   | /user/           | Register new user |
| POST   | /auth/login       | Login user        |

### Task Routes (Protected)

| Method | Endpoint              | Description        |
|--------|-----------------------|-------------------|
| GET    | /todos                | Get all tasks     |
| POST   | /todo/:id             | Create task       |
| PUT    | /todo/:id             | Update task       |
| DELETE | /todo/:id             | Delete task       |

---

## 🚀 Deployment (Render)

- Build Command: `npm run build`
- Start Command: `npm start`
- Environment Variables configured in Render dashboard
- MongoDB Atlas used for production database

---

## 🧪 Testing APIs

You can test using:
- Postman
- Thunder Client (VS Code)

---

## 👨‍💻 Author

Pratik Kore  
MERN Stack Developer
