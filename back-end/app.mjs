// back-end/app.mjs
import express from "express";
import userRoutes from "./routes/users.mjs";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

export default app;