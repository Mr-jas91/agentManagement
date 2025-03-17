const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleWare");
const List = require("../models/ListModel");

// Get tasks for Admin & Agents
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await List.find().populate("agentId", "name email");
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
