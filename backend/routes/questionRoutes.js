const express = require("express");
const Question = require("../models/Question");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Upload questions (user-specific)
router.post("/upload-questions", protect, async (req, res) => {
  try {
    const questions = req.body.map(q => ({ ...q, userId: req.user._id }));
    await Question.insertMany(questions);
    res.json({ message: "Questions uploaded successfully!" });
  } catch (err) {
    console.log("problem")
    res.status(500).json({ error: err.message });
  }
});

// Get questions by date (user-specific)
router.get("/get-questions", protect, async (req, res) => {
  const { date } = req.query;
  try {
    const questions = await Question.find({ userId: req.user._id, date });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions (user-specific)
router.get("/get-all-questions", protect, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user._id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
