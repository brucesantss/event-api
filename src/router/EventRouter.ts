import { Router } from "express";
import { createEvent, getEvents } from "../controllers/EventController";

const router = Router();

router
    .post('/event', createEvent)
    .get('/event', getEvents)

export default router;