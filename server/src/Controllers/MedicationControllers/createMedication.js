const PatientsModel = require("../../Models/PatientsModel");

const createMedication = async (req, res) => {
  const { id, medication } = req.body;

  if (
    !id ||
    !medication ||
    !medication.name ||
    !medication.dosage ||
    !medication.notificationType ||
    !medication.schedule ||
    !medication.schedule.time ||
    !medication.schedule.frequency
  ) {
    return res.status(400).json({ Error: "Enter Valid Login Credentials" });
  }

  try {
    const newMedication = {
      name: medication.name,
      dosage: medication.dosage,
      notificationType: medication.notificationType,
      schedule: medication.schedule,
    };

    const patient = await PatientsModel.findOne({ _id: id });

    if (!patient) {
      return res.status(404).json({ Error: "Patient not found" });
    }

    patient.medications = patient.medications || [];
    patient.medications.push(newMedication);
    const savedMedication = await patient.save();
    
    const lastMedication = savedMedication.medications[savedMedication.medications.length - 1];

    return res.status(200).json({
      message: "Medication created successfully",
      medicationId: lastMedication._id,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = createMedication;
