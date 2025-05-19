import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(express.json());
app.use('/', userRoutes);

// Serve API documentation as HTML at '/'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/', (req, res) => {
  const docPath = path.join(__dirname, 'API_DOC.md');
  fs.readFile(docPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Documentation not found');
    // Convert markdown to HTML
    import('marked').then(marked => {
      const html = marked.parse(data);
      // Add JS to toggle example responses
      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User API Documentation</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown-light.min.css" rel="stylesheet">
  <style>
    body { background: #f6f8fa; margin: 0; padding: 0; }
    .markdown-body { box-sizing: border-box; min-width: 200px; max-width: 900px; margin: 40px auto; padding: 32px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .example-response { background: #f0f6ff; border-left: 4px solid #0070f3; margin: 16px 0; padding: 12px 16px; font-size: 15px; font-family: monospace; border-radius: 4px; }
    .example-label { font-weight: bold; color: #0070f3; margin-bottom: 4px; display: block; }
  </style>
</head>
<body>
  <article class="markdown-body">
    ${html}
    <h2>Example Responses</h2>
    <div class="example-label">Signup Success (201):</div>
    <div class="example-response">{ "message": "User created" }</div>
    <div class="example-label">Signup Error (409):</div>
    <div class="example-response">{ "error": "Username or email already exists" }</div>
    <div class="example-label">Login Success (200):</div>
    <div class="example-response">{
  "token": "&lt;jwt_token&gt;",
  "user": {
    "_id": "user_id",
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com"
  }
}</div>
    <div class="example-label">Login Error (401):</div>
    <div class="example-response">{ "error": "Invalid credentials" }</div>
    <div class="example-label">Get User Success (200):</div>
    <div class="example-response">{
  "_id": "user_id",
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com"
}</div>
    <div class="example-label">Get User Error (404):</div>
    <div class="example-response">{ "error": "User not found" }</div>
    <div class="example-label">Update User Success (200):</div>
    <div class="example-response">{
  "_id": "user_id",
  "username": "johndoe",
  "name": "Jane Doe",
  "email": "jane@example.com"
}</div>
    <div class="example-label">Delete User Success (200):</div>
    <div class="example-response">{ "message": "User deleted" }</div>
  </article>
</body>
</html>`);
    });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
