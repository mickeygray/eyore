const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  prevLeads: {
    type: Array,
  },
  leads: {
    type: Array,
  },
  tasks: {
    type: Array,
  },
  reminders: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      userReminded: { type: mongoose.Schema.Types.ObjectId },
      reminderDate: { type: Date },
      reminderDueDate: { type: Date },
      status: { type: String },
      daysTilDue: { type: Number },
      id: { type: String },
      text: { type: String },
      clientId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
