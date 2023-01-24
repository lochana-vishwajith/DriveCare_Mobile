const VehicleProfile = require("../Models/VehicleDetailsModel");

const addVehicle = async (details) => {
  console.log("register Vehicle");
  return new Promise(async (resolve, reject) => {
    const { yom, noofairbags, registrationNo } = details;
    try {
      const VehicleDetails = new VehicleProfile({
        yom,
        noofairbags,
        registrationNo,
        isVehicleHandedOver: false,
      });

      VehicleDetails.save()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { addVehicle };
