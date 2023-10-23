const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors")
const CareTakerRoute = require("./src/Routes/CareTakerRoute");
const UsersRoute = require("./src/Routes/UsersRoute");
const Login_Reg_Route = require("./src/Routes/Login_Reg_Route");
const MedicationRouter = require("./src/Routes/MedicationRoute");
const CareTakerModel = require("./src/Models/CareTakersModel");
const PatientsModel = require("./src/Models/PatientsModel");
const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json());
app.use("/api", UsersRoute);
app.use("/api", Login_Reg_Route);
app.use("/api", MedicationRouter);
app.use("/api", CareTakerRoute);

mongoose.connect("mongodb://127.0.0.1:27017/MedicineRemainderDb");

const db = mongoose.connection;

db.on("error", (err) => {
  if (!err) {
    console.log("Connected to Mongodb");
  } else {
    console.log(err);
  }
});

db.once("open", async () => {
  const countOfUsers = await PatientsModel.countDocuments();
  const countOfCareTakers = await CareTakerModel.countDocuments();

  try {
    if (countOfUsers === 0 || countOfCareTakers === 0) {
      const users = await fs.promises.readFile("./src/Utils/users.json");
      const caretakers = await fs.promises.readFile(
        "./src/Utils/caretaker.json"
      );

      PatientsModel.insertMany(JSON.parse(users));
      CareTakerModel.insertMany(JSON.parse(caretakers));
    }
  } catch (err) {
    console.log(err);
  }
});

app.use("*", (req, res) => {
  res.status(400).json({
    ERROR: "404 Error Route Not Found !",
    message: "Try again with a different route",
  });
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running on ${PORT}`);
  } else {
    console.log(err);
  }
});
