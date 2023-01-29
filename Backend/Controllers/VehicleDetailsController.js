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

const updateHandedPerson = async (req, res) => {
  console.log("handing over details updating");
  const { personDetails } = req.body;
  const { vehicleId } = req.params;

  try {
    await VehicleProfile.updateMany(
      { _id: vehicleId },
      {
        isVehicleHandedOver: true,
        handedOverTo: personDetails,
      }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { addVehicle, updateHandedPerson };
