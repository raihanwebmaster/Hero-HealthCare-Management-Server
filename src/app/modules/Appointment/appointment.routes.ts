import express from 'express'
import { AppointmentController } from './appointment.controller';
import { UserRole } from '@prisma/client';
import { AppointmentValidation } from './appointment.validation';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validationResquest';

const router = express.Router();

/**
 * ENDPOINT: /appointment/
 * 
 * Get all appointment with filtering
 * Only accessable for Admin & Super Admin
 */
router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    AppointmentController.getAllFromDB
);

router.get(
    '/my-appointment',
    auth(UserRole.PATIENT, UserRole.DOCTOR),
    AppointmentController.getMyAppointment
)

router.post(
    '/',
    auth(UserRole.PATIENT),
    validateRequest(AppointmentValidation.createAppointment),
    AppointmentController.createAppointment
);


router.patch(
    '/status/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    AppointmentController.changeAppointmentStatus
);



export const AppointmentRoutes = router;