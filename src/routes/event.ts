import {Router} from 'express';
import { createEvent, getEvents } from '../handlers';
import { auth } from '../middlewares/auth';

const router = Router();


router.post("/create", auth, createEvent)
router.get("/showAll", auth, getEvents)

export default router;