const UserProfile = require("../Models/UserModel");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addVehicle } = require("./VehicleDetailsController");

const registerUser = async (req, res) => {
  console.log("register user");
  const {
    fullName,
    email,
    phoneNumber,
    DOB,
    nic,
    licenseNo,
    password,
    image,
    isTaxiDriver,
    drivingProvince,
    drivingDistrict,
  } = req.body.userDetails;
  try {
    await UserProfile.findOne({ email: email }).then(
      async (emailIsAvilable) => {
        if (!emailIsAvilable) {
          const vehicleDetails = await addVehicle(req.body.vehicleDetails);
          console.log("vehicleDetails : ", vehicleDetails);
          bycrpt.hash(password, 10).then((hash) => {
            const UserDetails = new UserProfile({
              fullName,
              email,
              phoneNumber,
              DOB,
              nic,
              licenseNo,
              password: hash,
              image,
              isTaxiDriver,
              drivingProvince,
              drivingDistrict,
              VehicleDetailsId: vehicleDetails._id,
            });

            UserDetails.save()
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((error) => {
                res.status(400).json("Error: " + error);
              });
          });
        } else {
          return res.status(500).send("Email is already exsits");
        }
      }
    );
  } catch (err) {
    return res.status(500).send(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`email ${email} password ${password}`);

  const user = await UserProfile.findOne({ email: email });

  if (user) {
    const isMatch = await bycrpt.compare(password, user.password);

    const token = await user.generateAuthToken();

    res.cookie("JWTToken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    if (!isMatch) {
      console.log("Password is Incorrect");
      res.json({ error: "Login Failed" });
    } else if (!user) {
      console.log("email is Incorrect");
      res.json({ error: "Login Failed" });
    } else {
      const userDetails = await UserProfile.findOne({ email: email }).populate(
        "VehicleDetailsId",
        "_id  yom noofairbags registrationNo"
      );

      console.log("Login Successful");
      res.json({ message: "Login Successful", user: userDetails });
    }
  } else {
    console.log("email is Incorrect");
    res.status(500).json({ error: "Email not found" });
  }
};

const logOutUser = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("userlogged out", id);

    await UserProfile.updateOne(
      { _id: id },
      {
        $set: { tokens: [] },
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

const getUserDetails = async (req, res) => {
  console.log("fetching user details");
  const { id } = req.params;
  try {
    await UserProfile.findById(id)
      .populate("VehicleDetailsId", "_id  yom noofairbags registrationNo")
      .then((result) => {
        console.log("user details fetched");
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log("user details not fetched : ", error);

        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { registerUser, loginUser, logOutUser, getUserDetails };
