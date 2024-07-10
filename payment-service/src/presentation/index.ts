import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config();
import {routes} from "./../infrastructure/routes"
import {errorHandler} from '@learnwise/common'
import { dependencies } from "./../_boot/dependencies";
import morgan from "morgan";


const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4005;


app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/payment",routes(dependencies))
// app.use("/",routes(dependencies))

app.use("*",(req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "Api Not found" });
});  

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`connected to auth service defaultly at ${PORT}`);
});

export default app;