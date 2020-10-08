import "dotenv/config";

import express from "express";
import session from "express-session";
import { v4 as uuid } from "uuid";
import Auth from "./Auth";
import redis from "redis";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { daysToMs } from "./utils";
import cors from "cors";

const app = express();
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    genid: () => uuid(),
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESION_SECRET || "Hello World",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: daysToMs(1),
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.post("/login", (req, res) => {
  // Get user from fake database & if exists, check if password match
  const { isValid, user } = Auth.authenticateUser(req.body);

  // If all went well, store in session
  if (isValid) {
    req.session.user = user;
    return res.status(200).json({
      username: user.username,
      exp: req.session.cookie.expires,
    });
  }

  return res.status(404).json({ msg: "User or password is not valid" });
});

// Allow the client to grab user data if they have a valid session cookie
app.get("/status", Auth.isAuthenticated);

// Can only visit when valid session cookie
app.get("/protected", Auth.isAuthorized, (req, res) => {
  res.json(`username: ${req.session.user.username}`);
});

// Destroy session
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.status(200).json({});
  });
});

app.listen(5000, () => console.log("✨ server running on port 5000"));
