const mongoose = require("mongoose");

const curdSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is requried"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is requried"],
    minlength: 5,
  },
  country: {
    type: String,
    required: true,
  },
});

const Crud = mongoose.model("Crud", curdSchema);

module.exports = Crud;
