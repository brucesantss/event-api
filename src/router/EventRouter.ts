import { Router } from "express";
import { createEvent, getEventBySlug, getEvents } from "../controllers/EventController";

const router = Router();

router
    .post('/event', createEvent)
    .get('/event', getEvents)
    .get('/event/:slug', getEventBySlug)


export default router;