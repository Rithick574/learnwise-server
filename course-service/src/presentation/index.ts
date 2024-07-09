import express, { Application,Request,Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import {errorHandler} from "@learnwise/common"
import {routes} from "../infrastructure/routes"
import { dependencies } from "../_boot/dependencies";
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet";
import morgan from "morgan";


const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(morgan("dev"));


app.use("/api/course",routes(dependencies));


app.use("*",(req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Api Not found" });
});  

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`connected to course-service defaultly at ${PORT}`);
});

export default app;
