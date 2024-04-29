import express, { Application, NextFunction, Request, Response } from 'express'
import cors from "cors"
import router from './app/routers';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middleWares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import { AppointmentService } from './app/modules/Appointment/appointment.service';
import cron from 'node-cron'

const app:Application = express();
app.use(cors());
app.use(cookieParser());


//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

cron.schedule('* * * * *', () => {
    try {
        AppointmentService.cancelUnpaidAppointments();
    }
    catch (err) {
        console.error(err);
    }
});

app.get("/", (req: Request, res: Response) => {
    res.send({
        Message: "Hero Health care server"
    })
})
app.use("/api/v1", router )
app.use(globalErrorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND",
        error : {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;