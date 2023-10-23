const express = require("express");
const getAllCareTakersId = require("../Controllers/CareTakerControllers/getAllCareTakersId");
const assignCareTaker = require("../Controllers/CareTakerControllers/assignCareTaker");
const route = express.Router();

route.get("/careTakers",getAllCareTakersId);
route.post("/careTakers",assignCareTaker)
module.exports = route;
