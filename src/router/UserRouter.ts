import { Router } from "express";
import { createUser, getUsers } from "../controllers/RegisterController";

const router = Router();

router
    .post('/register', createUser)
    .get('/users', getUsers)

export default router;