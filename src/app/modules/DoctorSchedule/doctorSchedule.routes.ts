import express from 'express';
import { DoctorScheduleController } from './doctorSchedule.controller';
import { UserRole } from '@prisma/client';
import { DoctorScheduleValidation } from './doctorSchedule.validation';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validationResquest';

const router = express.Router();

/**
 * API ENDPOINT: /doctor-schedule/
 * 
 * Get all doctor schedule with filtering
 */
router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    DoctorScheduleController.getAllFromDB
);

router.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    DoctorScheduleController.getMySchedule
)

router.post(
    '/',
    auth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.create),
    DoctorScheduleController.insertIntoDB
);

router.delete(
    '/:id',
    auth(UserRole.DOCTOR),
    DoctorScheduleController.deleteFromDB
);


export const DoctorScheduleRoutes = router;