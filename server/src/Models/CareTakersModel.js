const { Schema, model } = require("mongoose");

const CareTakersSchema = new Schema({
  name: String,
  type: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: String,
  mobile: Number,
  notificationType : String,
  users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = model("CareTaker", CareTakersSchema);