import express, { NextFunction, Request, Response } from 'express';
import { SpecialtiesValidtaion } from './specialties.validation';
import { UserRole } from '@prisma/client';
import { SpecialtiesController } from './specialties.controller';
import { fileUploader } from '../../../helpers/fileUploader';
import auth from '../../middleWares/auth';


const router = express.Router();


router.get(
    '/',
    SpecialtiesController.getAllFromDB
);

router.post(
    '/',
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data))
        return SpecialtiesController.inserIntoDB(req, res, next)
    }
);


router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    SpecialtiesController.deleteFromDB
);

export const specialtiesRoutes = router;