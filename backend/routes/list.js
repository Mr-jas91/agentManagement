const express = require("express");
const xlsx = require("xlsx");
const List = require("../models/ListModel");
const Agent = require("../models/AgentsModel");
const authMiddleware = require("../middleware/authMiddleWare");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload CSV/XLSX & Distribute

const fs = require("fs");

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Parse the file
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Validate data structure
      if (!sheet.every((row) => row.FirstName && row.Phone && row.Notes)) {
        return res.status(400).json({ message: "Invalid file format" });
      }

      // Get all agents
      const agents = await Agent.find();
      if (agents.length === 0) {
        return res.status(400).json({ message: "No agents found" });
      }

      // Get existing lists
      const lists = await List.find();

      // Initialize agentTasks with existing lists or empty arrays
      const agentTasks = agents.map((agent) => {
        const existingList = lists.find(
          (list) => list.agentId.toString() === agent._id.toString()
        );
        return {
          agentId: agent._id,
          items: existingList ? existingList.items : []
        };
      });

      let agentIndex = 0;

      // Distribute new entries among agents
      sheet.forEach((row) => {
        const newItem = {
          firstName: row.FirstName,
          phone: row.Phone,
          notes: row.Notes
        };

        // Assign to the current agent
        agentTasks[agentIndex].items.push(newItem);

        // Move to the next agent in a round-robin fashion
        agentIndex = (agentIndex + 1) % agents.length;
      });

      // Save new task assignments
      await Promise.all(
        agentTasks.map(async (task) => {
          await List.findOneAndUpdate(
            { agentId: task.agentId },
            { $set: { items: task.items } },
            { upsert: true, new: true }
          );
        })
      );

      res.json({ message: "File processed and tasks uniquely assigned" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;

// Get assigned lists for an agent
router.get("/agent/:id", authMiddleware, async (req, res) => {
  try {
    const lists = await List.find({ agentId: req.params.id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
