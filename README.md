# 🚀 User API Project

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
[![Swagger Docs](https://img.shields.io/badge/API%20Docs-Swagger-green?logo=swagger)](http://localhost:3000/api-docs)

A **production-ready RESTful API** built with **Node.js**, **Express**, and **Sequelize ORM**, featuring authentication, authorization, session handling, and configurable settings.

---

## 📦 Features

- 👤 **User Management**: CRUD, upsert, bulk upsert, pagination & filtering
- 🔑 **Authentication**: JWT-based login, token verification, unblock users
- 📊 **Session Management**: Track and manage active sessions
- 📋 **Menu Management**: CRUD + filter menus
- ⚙️ **Configuration Management**: Manage app settings (e.g., max login attempts)
- 🛡️ **Security**: Middleware-based auth & error handling
- 📖 **Swagger UI** for live API documentation

---

## 📁 Project Structure
```

project/
│
├─ app.js # Entry point
├─ package.json
├─ .env
│
└─ src/
├─ api-docs/ # Swagger spec (swagger.yaml)
├─ config/ # DB config
├─ constants/ # Enums, messages
├─ controllers/ # Request handlers
├─ middlewares/ # Auth & error handlers
├─ models/ # Sequelize models
├─ repository/ # Data access layer
├─ routes/ # Express routes
├─ services/ # Business logic
└─ utils/ # Helpers (JWT, hash, errors, responses)

```

---

## 🔗 API Endpoints

### 👤 Users
- `GET /users` → Get all users
- `GET /users/:id` → Get user by ID
- `POST /users` → Create user
- `PUT /users/:id` → Update user
- `DELETE /users/:id` → Delete user
- `PUT /users/upsert` → Upsert user
- `PUT /users/bulk-upsert` → Bulk upsert users
- `POST /users/filter` → Paginated & filtered list

### 📊 Sessions
- `GET /sessions` → Get all sessions
- `GET /sessions/:id` → Get session by ID
- `POST /sessions` → Create session
- `PUT /sessions/:id` → Update session
- `DELETE /sessions/:id` → Delete session

### 📋 Menus
- `GET /menus` → Get all menus
- `GET /menus/:id` → Get menu by ID
- `POST /menus` → Create menu
- `PUT /menus/:id` → Update menu
- `DELETE /menus/:id` → Delete menu
- `POST /menus/filter` → Filter menus

### ⚙️ Config
- `PUT /config/max-login-attempts` → Set max login attempts

### 🔑 Auth
- `POST /auth/login` → Login
- `POST /auth/unblock` → Unblock user
- `GET /auth/verify` → Verify token

---

## 📖 API Documentation (Swagger)

This project includes **Swagger UI** to explore and test APIs.

👉 Open in browser:
```

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

```

### Authentication in Swagger
1. Login via `POST /auth/login`
2. Copy JWT token
3. Click **Authorize** in Swagger UI
4. Enter token as:
```

Bearer \<your_token>

````

Now you can access secured routes 🎉

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/user-api.git

# Install dependencies
npm install

# Run in dev mode
node app.js
````

---

## 📝 Environment Variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
JWT_SECRET=your_jwt_secret
```

---

## 🛠️ Technologies Used

- **Node.js** & **Express.js**
- **Sequelize ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Swagger (OpenAPI)**
- **dotenv** for config

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch `feature/your-feature`
3. Commit changes
4. Push branch
5. Create Pull Request

---

## 📄 License

Licensed under the **MIT License**.

---

## 🎉 Acknowledgements

- Express & Sequelize communities 🙌
- Swagger for API docs
