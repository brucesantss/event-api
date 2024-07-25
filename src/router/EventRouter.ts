import { Router } from "express";
import { createEvent, deleteEvent, getEventBySlug, getEvents, updateEvent } from "../controllers/EventController";

const router = Router();

router
    .post('/event', createEvent)
    .get('/event', getEvents)
    .get('/event/:slug', getEventBySlug)
    .put('/event/:id', updateEvent)
    .delete('/event/:id', deleteEvent)


export default router;