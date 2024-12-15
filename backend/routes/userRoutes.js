import express from 'express';
import { getUsers, getUserById, createUser, deleteUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', createUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

export default router;