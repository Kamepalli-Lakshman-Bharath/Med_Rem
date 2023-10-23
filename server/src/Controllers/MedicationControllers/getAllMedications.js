const PatientsModel = require("../../Models/PatientsModel");

const getAllMedications = async (req, res) => {
  const { id } = req.params;
  

  try {
    const patient = await PatientsModel.findOne({ _id: id });

    if (!patient) {
      return res.status(404).json({ Error: "Patient not found" });
    }

    const medications = patient.medications || [];
    return res.status(200).json(medications);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = getAllMedications;
