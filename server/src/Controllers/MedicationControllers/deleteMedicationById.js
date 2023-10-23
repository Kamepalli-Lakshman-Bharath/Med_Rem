const PatientsModel = require("../../Models/PatientsModel");

const deleteMedicationbyId = async (req, res) => {
  const { patientId, medicationId } = req.body;
  if (!patientId || !medicationId) {
    return res.status(400).json({ Error: "Enter Valid Patient and Medication IDs" });
  }

  try {
    const patient = await PatientsModel.findOne({ _id: patientId });

    if (!patient) {
      return res.status(404).json({ Error: "Patient not found" });
    }

    const medicationIndex = patient.medications.findIndex((med) => med._id == medicationId);

    if (medicationIndex === -1) {
      return res.status(404).json({ Error: "Medication not found" });
    }

    patient.medications.splice(medicationIndex, 1);
    await patient.save();

    return res.status(200).json({ message: "Medication deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = deleteMedicationbyId;
