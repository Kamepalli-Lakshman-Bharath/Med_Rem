const CareTakerModel = require("../../Models/CareTakersModel");
const PatientsModel = require("../../Models/PatientsModel");

const Register = async (req, res) => {
  const { name, type, email, password, mobile, notificationType } = req.body;

  if (!name || !type || !email || !password || !mobile || !notificationType) {
    return res.status(400).json({ isRegistered: false, mess: "Invalid Data" });
  }

  try {
    const isEmailExistInPatients = await PatientsModel.findOne({ email: email });
    const isEmailExistInCareTakers = await CareTakerModel.findOne({ email: email });

    if (isEmailExistInPatients || isEmailExistInCareTakers) {
      return res.status(400).json({ mess: "Entered Mail Id is Already registered" });
    }

    const UserModel = type === "patient" ? PatientsModel : CareTakerModel;

    const newUser = new UserModel({
      name: name,
      type: type,
      email: email,
      password: password,
      mobile: mobile,
      notificationType: notificationType,
      medications: type === "patient" ? [] : undefined,
      caretakers: type === "patient" ? undefined : [],
      users: type === "caretaker" ? [] : undefined,
    });

    await newUser.save();
    return res.status(200).json({ isRegistered: true });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = Register;
