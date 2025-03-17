const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({ email: "admin@example.com", password: hashedPassword });
    console.log("Admin user created");
    mongoose.connection.close();
  });
