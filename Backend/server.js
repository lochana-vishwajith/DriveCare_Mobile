// Requiring module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Creating express object
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Port Number
const PORT = process.env.PORT || 5000;

// Configuring dotenv variables
const MONGO_URI = process.env.MONGO_URI;

app.use("/user", require("./Routes/UserRoutes"));

// Server Setup
app.listen(PORT, async () => {
  //mongodb connection
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Express server running at PORT ${PORT}`);
});
