import express from 'express';
import { signup, login, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user/:id', auth, getUser);
router.put('/user/:id', auth, updateUser);
router.delete('/user/:id', auth, deleteUser);

export default router;
