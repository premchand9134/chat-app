import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import { connectDB } from "../src/lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./Routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
import fs from "fs";

dotenv.config(".env");
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],

    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../Frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//   });
// }

const frontendPath = path.resolve(__dirname, "../Frontend/dist");

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.error("⚠️ Frontend build folder not found:", frontendPath);
}

server.listen(PORT, () => {
  console.log("Server started on port :", PORT);
  connectDB();
});
