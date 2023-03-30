import { Router } from 'express';
import { createAccount, login } from '../controller/user.controller.js';

const userRoutes = Router();

userRoutes.post('/signup', createAccount);
userRoutes.post('/login', login);

export { userRoutes };