const express = require("express");
const bcrypt = require("bcryptjs");
const Agent = require("../models/AgentsModel");
const authMiddleware = require("../middleware/authMiddleWare");

const router = express.Router();

// Add Agent
router.post("/add", authMiddleware, async (req, res) => {
  const { name, email, mobile,countryCode, password } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent)
      return res.status(400).json({ message: "Agent already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({
      name,
      email,
      mobile,
      countryCode,
      password: hashedPassword
    });

    await newAgent.save();
    res.status(201).json({ message: "Agent added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Agents
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find().select("-password"); // Hide passwords
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
