import { Router } from "express";

import { choiceValidation } from "../middlewares/choiceValidation.js";
import { postChoice, getChoices } from "../controllers/choices.controller.js";

const router = Router();

router.post('/choice', choiceValidation, postChoice);
router.get('/poll/:id/choice', getChoices);

export default router;