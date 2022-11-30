import { Router } from "express";

import { postPoll, getPolls, getPollResult } from "../controllers/polls.controller.js";
import { pollValidation } from '../middlewares/pollValidation.js';
import { resultValidation } from "../middlewares/resultValidation.js";

const router = Router();

router.post('/poll', pollValidation, postPoll);
router.get('/poll', getPolls);
router.get('/poll/:id/result', resultValidation, getPollResult);

export default router;