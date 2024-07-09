import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "@learnwise/common";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import connectSocketIo from "../infrastructure/socket";
import { router } from "../infrastructure/routes";
import { dependencies } from "../_boot/dependencies";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4006;

if (!PORT) {
    throw new Error("PORT environment variable is not defined");
  }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(morgan("dev"));

//to start socket server
const server = http.createServer(app);

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectSocketIo(server)
app.use('/api/chat',router(dependencies))

//to catch unknown routes
app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "Api Not found" });
});

//error handler
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`connected to chat-service defaultly at ${PORT}`);
});

export default app;
