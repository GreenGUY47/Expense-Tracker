import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import expressratelimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import authRoute from "./routes/auth.route.js";
import trackerRoute from "./routes/tracker.route.js";
import incomeRoute from "./routes/income.route.js";
import expenseRoute from "./routes/expense.route.js";
import categoryRoute from "./routes/category.route.js";
import budgetRoute from "./routes/budget.route.js";

const whitelisting = ["http://localhost:5173", process.env.CORS].filter(Boolean);

const corsOption = {
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);
    if (whitelisting.includes(origin)) {
      return cb(null, true);
    } else {
      return cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cors(corsOption));
app.use(cookieparser());
app.use(
  expressratelimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {
      success: false,
      message: "Too many request from this IP address, please try again later!!!",
    },
  })
);
app.use(helmet());
app.use(compression());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/trackers", trackerRoute);
app.use("/api/v1/incomes", incomeRoute);
app.use("/api/v1/expenses", expenseRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/budgets", budgetRoute);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `⚠️ [404 NOT FOUND]: ${req.method} request made to non-existent route: ${req.originalUrl}`,
  });
});

app.use((error, req, res, _next) => {
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || `Something went wrong, please try again later`,
  });
});

export default app;
