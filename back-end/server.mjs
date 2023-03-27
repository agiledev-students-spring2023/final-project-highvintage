import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UsersRoute from "./routes/users.mjs";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", UsersRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
