const { Schema, model } = require("mongoose");

const medicationSchema = new Schema({
  name: String,
  dosage: String,
  notificationType: {
    type: String,
    lowercase: true,
  },
  schedule: {
    time: String,
    frequency: String, // ( daily, weekly)
  },
  caretaker: { type: Schema.Types.ObjectId, ref: "CareTakers" },
});

const PatientSchema = new Schema({
  name: String,
  type: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  mobile: Number,
  password: String,
  medications: [medicationSchema],
});

module.exports = model("Patient", PatientSchema);
