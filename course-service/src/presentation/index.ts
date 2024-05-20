import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`connected to course-service defaultly at ${PORT}`);
});

export default app;
