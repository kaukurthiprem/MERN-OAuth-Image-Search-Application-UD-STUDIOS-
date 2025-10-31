// server/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import "./auth.js"; // Google strategy

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // ✅ allow cookies to pass
  })
);

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mern_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only if https
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
import searchRoutes from "./routes/search.js";
import historyRoutes from "./routes/history.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/search", searchRoutes);
app.use("/api/history", historyRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Server running 🚀"));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
