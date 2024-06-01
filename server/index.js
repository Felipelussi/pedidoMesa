import express from "express";
import userRoutes from "./routes/users.routes..js";
import authRoutes from "./routes/auth.routes.js";
import auth from "./middleware/auth.middleware.js";

const app = express();
const port = 3000;

app.use("/", express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/log", auth);
app.use("/users", userRoutes);
app.use("/login", authRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
