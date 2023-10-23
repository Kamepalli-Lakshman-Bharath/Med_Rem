const CareTakerModel = require("../../Models/CareTakersModel");
const PatientsModel = require("../../Models/PatientsModel");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ isLogin: false, mess: "Enter valid login credentials" });
  }

  try {
    const user = await PatientsModel.findOne({ email: email }) || await CareTakerModel.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        return res.status(200).json({ _id: user._id, isLogin: true, type: user.type});
      } else {
        return res.status(400).json({ isLogin: false, mess: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ isLogin: false, mess: "Invalid Email" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = Login;
