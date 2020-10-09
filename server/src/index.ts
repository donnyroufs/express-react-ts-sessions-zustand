import "dotenv/config";

import express from "express";
import session from "express-session";
import { v4 as uuid } from "uuid";
import redis from "redis";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { daysToMs } from "./utils";
import cors from "cors";
import csurf from 'csurf'
import routes from './routes';


const app = express();
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cookieParser());

const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  },
})

app.use(csrfProtection, function(req, res, next) {
  const csrfToken = req.csrfToken()
  res.cookie('csrf-token', csrfToken)
  next();
});

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    genid: () => uuid(),
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESION_SECRET || "Hello World",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: daysToMs(1),
      secure: process.env.NODE_ENV === "production",
    },
  })
);


app.use('/', csrfProtection, routes)

app.listen(5000, () => console.log("✨ server running on port 5000"));
