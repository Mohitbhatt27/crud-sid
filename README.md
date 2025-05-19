# Express CRUD API for Users

This project is a simple Express.js CRUD API for user management, using Mongoose and MongoDB Atlas (cluster). It is ready to be deployed on Render.

## Features
- Signup (create user)
- Login (JWT auth)
- Get user
- Update user
- Delete user

## User Model
- username (unique)
- password (hashed)
- name
- email

## Setup
1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   ```
3. Start the server:
   ```sh
   npm start
   ```

## Deployment
- This app is ready for Render. Set the environment variables in Render dashboard.

## All Routes (in one file)
- `POST   /signup`   - Create a new user
- `POST   /login`    - Login and get JWT
- `GET    /user/:id` - Get user by ID
- `PUT    /user/:id` - Update user by ID
- `DELETE /user/:id` - Delete user by ID

## Notes
- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- All routes are in a single file for simplicity.
