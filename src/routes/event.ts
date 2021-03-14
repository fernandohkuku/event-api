import {Router} from 'express';
import { createEvent, deletEvent, getEvent, getEvents } from '../handlers';
import { auth } from '../middlewares/auth';

const router = Router();


router.post("/create", auth, createEvent)
router.get("/showAll", auth, getEvents)
router.route("/:event_id").get(auth, getEvent).delete( auth, deletEvent)

export default router;