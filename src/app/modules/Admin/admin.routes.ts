import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middleWares/validationResquest";
import { adminValidationSchemas } from "./admin.validations";
import auth from "../../middleWares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router()


router.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), adminController.getAllAdmin)
router.get("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), adminController.getSingleAdmin)
router.patch("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),  validateRequest(adminValidationSchemas.update), adminController.updatedAdmin)
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), adminController.deleteAdmin)
router.delete("soft/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), adminController.softDeleteAdmin)

export const  adminRoutes = router;