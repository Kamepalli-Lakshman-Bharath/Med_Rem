const CareTakersModel = require("../../Models/CareTakersModel");
const PatientsModel = require("../../Models/PatientsModel");

const assignCareTaker = async (req, res) => {
  const { patientId, careTakerId, medicationId } = req.body;

  if (!patientId || !careTakerId || !medicationId) {
    return res.status(400).send("Enter Valid Id's");
  }

  try {
    const patient = await PatientsModel.findOne({ _id: patientId });
    const careTaker = await CareTakersModel.findOne({ _id: careTakerId });

    if (!patient || !careTaker) {
      return res.status(400).send("Entered Id's not found");
    }

    const medication = patient.medications.id(medicationId);

    if (!medication) {
      return res.status(400).send("Medication not found");
    }

    if (!medication.caretaker) {
      medication.caretaker = careTakerId;
    }

    if (!careTaker.users) {
      careTaker.users = [];
    }

    if (!careTaker.users.includes(patientId)) {
      careTaker.users.push(patientId);
    }

    await Promise.all([patient.save(), careTaker.save()]);
    return res.status(200).send("Caretaker assigned successfully");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = assignCareTaker;
