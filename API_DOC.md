# User API Documentation

This API provides user authentication and management endpoints. All responses are in JSON. For protected routes, include the JWT token in the `Authorization` header as `Bearer <token>`.

## Base URL
```
http://<your-server-domain>/
```

---

## 1. Signup
**Endpoint:** `POST /signup`

**Description:** Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "yourpassword",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
- `201 Created`: `{ "message": "User created" }`
- `409 Conflict`: `{ "error": "Username or email already exists" }`
- `400 Bad Request`: `{ "error": "All fields required" }`

---

## 2. Login
**Endpoint:** `POST /login`

**Description:** Login with username and password. Returns a JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "yourpassword"
}
```

**Response:**
- `200 OK`: `{ "token": "<jwt_token>", "user": { "_id": "user_id", "username": "johndoe", "name": "John Doe", "email": "john@example.com" } }`
- `401 Unauthorized`: `{ "error": "Invalid credentials" }`
- `400 Bad Request`: `{ "error": "Username and password required" }`

---

## 3. Get User
**Endpoint:** `GET /user/:id`

**Description:** Get user details by user ID. Requires JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
- `200 OK`:
```json
{
  "_id": "user_id",
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com"
}
```
- `404 Not Found`: `{ "error": "User not found" }`
- `401 Unauthorized`: `{ "error": "No token provided" }` or `{ "error": "Invalid token" }`

---

## 4. Update User
**Endpoint:** `PUT /user/:id`

**Description:** Update user details (name, email, or password) by user ID. Requires JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body (any or all fields):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "newpassword"
}
```

**Response:**
- `200 OK`: Updated user object (without password)
- `404 Not Found`: `{ "error": "User not found" }`
- `401 Unauthorized`: `{ "error": "No token provided" }` or `{ "error": "Invalid token" }`

---

## 5. Delete User
**Endpoint:** `DELETE /user/:id`

**Description:** Delete a user by user ID. Requires JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
- `200 OK`: `{ "message": "User deleted" }`
- `404 Not Found`: `{ "error": "User not found" }`
- `401 Unauthorized`: `{ "error": "No token provided" }` or `{ "error": "Invalid token" }`

---

## Error Responses
All errors are returned as JSON with an `error` field.

---

## Example Usage (with axios)
```js
import axios from 'axios';

// Signup
axios.post('/signup', {
  username: 'johndoe',
  password: 'pass',
  name: 'John',
  email: 'john@example.com'
});

// Login
axios.post('/login', {
  username: 'johndoe',
  password: 'pass'
});

// Get user
axios.get('/user/<id>', {
  headers: { Authorization: 'Bearer <token>' }
});

// Update user
axios.put('/user/<id>', {
  name: 'Jane'
}, {
  headers: { Authorization: 'Bearer <token>' }
});

// Delete user
axios.delete('/user/<id>', {
  headers: { Authorization: 'Bearer <token>' }
});
```
