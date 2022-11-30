import { Router } from "express";

import { choiceValidation } from "../middlewares/choiceValidation.js";
import { 
  postChoice,
   getChoices,
   postVote
 } from "../controllers/choices.controller.js";
import { voteValidation } from "../middlewares/voteValidation.js";

const router = Router();

router.post('/choice', choiceValidation, postChoice);
router.get('/poll/:id/choice', getChoices);
router.post('/choice/:id/vote', voteValidation, postVote);

export default router;