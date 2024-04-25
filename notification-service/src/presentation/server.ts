import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notificationRoutes } from "@/infrastructure/routes";
import { dependencies } from "@/__boot/dependencies";


const app: Application = express();
const PORT: number = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Notification service ON!"
    })
});

app.use('/api/notification', notificationRoutes(dependencies));

app.listen(PORT, () => {
    console.log(`connected to auth service at ${PORT}`);
  });

export default app;