import { Router } from "express";

import { postPoll, getPolls } from "../controllers/polls.controller.js";
import { pollValidation } from '../middlewares/pollValidation.js';

const router = Router();

router.post('/poll', pollValidation, postPoll);
router.get('/poll', getPolls);

export default router;