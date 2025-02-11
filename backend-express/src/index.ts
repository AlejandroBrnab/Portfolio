import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pino from "pino";
import connectDB from "./config/database";
import projectRoutes from "./routes/projectRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
});

const app = express();

app.use(cors({ origin: process.env.FRONTEND_DOMAIN }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Kiwi");
});

connectDB();

const PORT = process.env.PORT || 31415;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));