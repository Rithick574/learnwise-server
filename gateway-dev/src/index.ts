import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
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
  notification: process.env.NOTIFICATION_SERVICE
};

const routes = [
  {
    context: "/api/auth",
    target: services.auth,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" } as { [regexp: string]: string },
  },
  {
    context: "/api/user",
    target: services.user,
    changeOrigin: true,
    pathRewrite: { "^/api/user": "" } as { [regexp: string]: string },
  },
  {
    context: "/api/notification",
    target: services.notification,
    changeOrigin: true,
    pathRewrite: { "^/api/notification": "" } as { [regexp: string]: string },
  }
];

// Proxy setup for user route
routes.forEach((route) => {
  app.use(
    route.context,
    createProxyMiddleware({
      target: route.target,
      pathRewrite: route.pathRewrite,
      changeOrigin: true,
      secure: false,
    })
  );
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
