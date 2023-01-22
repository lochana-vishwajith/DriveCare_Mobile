const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const UserDetails = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  licenseNo: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isTaxiDriver: {
    type: Boolean,
    required: true,
  },
  drivingProvince: {
    type: String,
    required: false,
  },
  drivingDistrict: {
    type: String,
    required: false,
  },
  VehicleDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicledetails",
    required: false,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserDetails.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "aaaabbbbccccddddeeeeffffggggtttt");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const UserProfile = mongoose.model("userdetails", UserDetails);
module.exports = UserProfile;
