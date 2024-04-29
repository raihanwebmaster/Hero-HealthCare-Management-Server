import express from 'express'
import { ReviewController } from './review.controller';
import { UserRole } from '@prisma/client';
import { ReviewValidation } from './review.validation';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validationResquest';

const router = express.Router();

router.get('/', ReviewController.getAllFromDB);

router.post(
    '/',
    auth(UserRole.PATIENT),
    validateRequest(ReviewValidation.create),
    ReviewController.insertIntoDB
);


export const ReviewRoutes = router;