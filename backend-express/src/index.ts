import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pino from "pino";
import nodemailer from "nodemailer";
import connectDB from "./config/database";
import projectRoutes from "./routes/projectRoutes";
import commentRoutes from "./routes/commentRoutes";
import technologyRoutes from "./routes/technologyRoutes";

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
app.use('/api/technologies', technologyRoutes);

app.get("/", (req, res) => {
  res.send("Dog");
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending route
app.post("/send", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send("Email sent: " + info.response);
  });
});

connectDB();

const PORT = process.env.PORT || 31415;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));