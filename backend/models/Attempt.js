const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: String,
  answers: [{
    questionId: String,
    selectedIndex: Number,
    correct: Boolean,
    mark: Number
  }],
  totalScore: Number
});

module.exports = mongoose.model("Attempt", attemptSchema);
