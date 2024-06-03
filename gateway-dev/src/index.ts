import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import proxy from "express-http-proxy";
import { config } from "dotenv";
config();

const app: Application = express();
const PORT: number = Number(process.env.PORT || 4000);

// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Setting up cors
const allowedOrigins = [process.env.CLIENT_URL!];
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

//services
const services = {
  auth: process.env.AUTH_SERVICE,
  user: process.env.USER_SERVICE,
  notification: process.env.NOTIFICATION_SERVICE,
  course:process.env.COURSE_SERVICE,
  payment:process.env.PAYMENT_SERVICE
};

const routes = [
  {
    context: "/api/auth",
    target: services.auth,
    changeOrigin: true,
  },
  {
    context: "/api/notification",
    target: services.notification,
    changeOrigin: true,
  },
  {
    context: "/api/user",
    target: services.user,
    changeOrigin: true,
  },
  {
    context:"/api/course",
    target: services.course,
    changeOrigin:true,
  },
  {
    context:"/api/payment",
    target:services.payment,
    changeOrigin:true
  }
];

// Proxy setup for routes
routes.forEach((route) => {
  if (typeof route.target === "string") {
    app.use(route.context, proxy(route.target));
  } else {
    console.warn(`Proxy target for ${route.context} is undefined.`);
  }
});

app.listen(PORT, () => {
  console.log(`
░▒▓█▓▒░      ░▒▓████████▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓███████▓▒░▒▓████████▓▒░ 
░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░        
░▒▓█▓▒░      ░▒▓██████▓▒░ ░▒▓████████▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓██████▓▒░░▒▓██████▓▒░   
░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░        
░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░        
░▒▓████████▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█████████████▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░                                                                                                                     
`);

  console.log(
    `[ SERVICE :: API GATEWAY ] API Gateway is listening on http://localhost:${PORT}`
  );
});
