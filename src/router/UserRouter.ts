import { Router } from "express";
import { createUser, getUsers } from "../controllers/UserController";

const router = Router();

router
    .post('/register', createUser)
    .get('/users', getUsers)

export default router;