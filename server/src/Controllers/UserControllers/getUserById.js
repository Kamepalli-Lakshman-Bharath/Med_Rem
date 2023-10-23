const CaretakersModel = require("../../Models/CareTakersModel");
const PatientsModel = require("../../Models/PatientsModel");

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const caretaker = await CaretakersModel.findOne({ _id: id });
    const patient = await PatientsModel.findOne({ _id: id });

    if (caretaker) {
      return res.status(200).json(caretaker);
    } else if (patient) {
      return res.status(200).json(patient);
    } else {
      return res.status(404).json({ Error: "Id Not Found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = getUserById;
