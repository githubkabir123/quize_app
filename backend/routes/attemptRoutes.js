const express = require("express");
const Attempt = require("../models/Attempt");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/submit-quiz", protect, async (req, res) => {
  const { date, answers } = req.body;
  let totalScore = 0;
  const processedAnswers = answers.map(ans => {
    const mark = ans.correct ? ans.marks : -ans.negativeMark;
    totalScore += mark;
    return { ...ans, mark };
  });

  try {
    const attempt = new Attempt({
      userId: req.user._id,
      date,
      answers: processedAnswers,
      totalScore
    });
    await attempt.save();
    res.json({ message: "Quiz submitted", totalScore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard (user-specific)
router.get("/dashboard", protect, async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user._id });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
