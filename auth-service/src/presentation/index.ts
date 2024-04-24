import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config();
import {routes} from "@/infrastructure/routes"
import { dependencies } from "@/_boot/dependencies";


const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const errorResponse = {
      errors: [{ message: err?.message || "Something went wrong" }],
    };
    return res.status(500).json(errorResponse);
  });

  app.use("/",routes(dependencies))

  app.listen(PORT, () => {
    console.log(`connected to auth service defaultly at ${PORT}`);
  });
  
  export default app;