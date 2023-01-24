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
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetails",
    required: false,
  },
  isVehicleHandedOver: {
    type: Boolean,
    required: true,
  },
  handedOverTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetails",
    required: false,
  },
});

const VehicleProfile = mongoose.model("vehicledetails", vehicleDetails);
module.exports = VehicleProfile;
