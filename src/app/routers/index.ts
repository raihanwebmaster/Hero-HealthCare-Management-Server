import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { specialtiesRoutes } from "../modules/Specialties/specialties.routes";
import { doctorRoutes } from "../modules/Doctor/doctor.routes";
import { PatientRoutes } from "../modules/Patient/patient.routes";
import { ScheduleRoutes } from "../modules/Schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/doctorSchedule.routes";
import { AppointmentRoutes } from "../modules/Appointment/appointment.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
import { PrescriptionRoutes } from "../modules/Prescription/prescription.routes";
import { ReviewRoutes } from "../modules/Review/review.routes";
import { MetaRoutes } from "../modules/Meta/meta.routes";

const router = express.Router()

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/admin",
        route: adminRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: '/specialties',
        route: specialtiesRoutes
    },
    {
        path: '/doctor',
        route: doctorRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: DoctorScheduleRoutes
    },
    {
        path: '/appointment',
        route: AppointmentRoutes
    },
    {
        path: '/payment',
        route: PaymentRoutes
    },
    {
        path: '/prescription',
        route: PrescriptionRoutes
    },
    {
        path: '/review',
        route: ReviewRoutes
    },
    {
        path: '/meta',
        route: MetaRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;