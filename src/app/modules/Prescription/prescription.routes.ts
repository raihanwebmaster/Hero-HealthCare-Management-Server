import express from 'express';
import { PrescriptionController } from './prescription.controller';
import { UserRole } from '@prisma/client';
import { PrescriptionValidation } from './prescription.validation';
import auth from '../../middleWares/auth';
import validateRequest from '../../middleWares/validationResquest';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    PrescriptionController.getAllFromDB
);

router.get(
    '/my-prescription',
    auth(UserRole.PATIENT),
    PrescriptionController.patientPrescription
)

router.post(
    '/',
    auth(UserRole.DOCTOR),
    validateRequest(PrescriptionValidation.create),
    PrescriptionController.insertIntoDB
)


export const PrescriptionRoutes = router;