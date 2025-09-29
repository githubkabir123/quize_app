// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');
const Subject = require('../models/Subject');
const  protect  = require('../middleware/authMiddleware');

// GET Dashboard Data
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Total Quizzes & Marks
    const quizAttempts = await Attempt.find({ userId }).sort({ date: -1 });

    // Summary Stats
    const totalQuizzes = quizAttempts.length;
    const totalMarks = quizAttempts.reduce((acc, q) => acc + q.score, 0);
    const averageScore = totalQuizzes > 0 ? (totalMarks / totalQuizzes).toFixed(2) : 0;
    const totalTimeSpent = quizAttempts.reduce((acc, q) => acc + q.timeTaken, 0);

    // Study Subjects
    const subjects = await StudySubject.find({ userId });

    res.json({
      summary: {
        totalQuizzes,
        averageScore,
        totalTimeSpent
      },
      quizAttempts,
      subjects
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
