const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./db");
const userRouter = require("./routes/userRoute");

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// Use the user router
// app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.log(`Error while starting the server: ${error}`);
  }
});
