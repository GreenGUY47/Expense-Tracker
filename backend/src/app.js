import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieparser from "cookie-parser";
import compression from "compression";
import expressratelimit from "express-rate-limit";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(
  urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieparser());
app.use(compression());
app.use(
  expressratelimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too manay request from this IP, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  })
);
const whitelist = ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.set("trust proxy", 1);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
