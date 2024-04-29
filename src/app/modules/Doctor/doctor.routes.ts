import express from 'express'
import { UserRole } from '@prisma/client';
import { DoctorController } from './doctor.controller';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validationResquest';
import { DoctorValidation } from './doctor.validation';

const router = express.Router();


router.get('/', DoctorController.getAllFromDB);

router.get('/:id', DoctorController.getByIdFromDB);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    validateRequest(DoctorValidation.update),
    DoctorController.updateIntoDB
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorController.deleteFromDB
);

router.delete(
    '/soft/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorController.softDelete);

export const doctorRoutes = router