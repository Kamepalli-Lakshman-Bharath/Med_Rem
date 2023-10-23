const express = require("express");
const createMedication = require("../Controllers/MedicationControllers/createMedication");
const deleteMedicationbyId = require("../Controllers/MedicationControllers/deleteMedicationById");
const getAllMedications = require("../Controllers/MedicationControllers/getAllMedications");

const route = express.Router();

route.post("/medication", createMedication);
route.delete("/medication", deleteMedicationbyId);
route.get("/medication/:id", getAllMedications);

module.exports = route;
