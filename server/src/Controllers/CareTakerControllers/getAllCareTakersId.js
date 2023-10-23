const CareTakersModel = require("../../Models/CareTakersModel");

const getAllCareTakersId = async (req, res) => {
  try {
    const careTakers = await CareTakersModel.find();

    if (!careTakers || careTakers.length === 0) {
      return res.status(400).json({ Error: "No CareTakers Found" });
    }

    const careTakersId = careTakers.map((caretaker) => ({ id: caretaker._id }));
    return res.status(200).json(careTakersId);

  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = getAllCareTakersId;
