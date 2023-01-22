const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleDetails = new Schema({
  yom: {
    type: Date,
    required: true,
  },
  noofairbags: {
    type: Number,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
});

const VehicleProfile = mongoose.model("vehicledetails", vehicleDetails);
module.exports = VehicleProfile;
