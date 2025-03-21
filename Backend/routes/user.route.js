import express from 'express';
import { check } from 'express-validator';
import {updateUserScore} from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import { checkValidation } from '../middleware/validation.js';

router.post(
  '/score',
  [
    auth,
    [
      check('quizId', 'Quiz ID is required').not().isEmpty(),
      check('score', 'Score is required').isNumeric()
    ],
    checkValidation
  ],
  updateUserScore
);

export default router;