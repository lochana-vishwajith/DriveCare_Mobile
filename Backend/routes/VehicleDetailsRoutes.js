const express = require("express");
const router = express.Router();

const {
  updateHandedPerson,
} = require("../Controllers/VehicleDetailsController");

//@route  POST /users/login
//@desc   Login User
//@access Public
router.put("/vehicleHanded/:id", updateHandedPerson);

module.exports = router;
