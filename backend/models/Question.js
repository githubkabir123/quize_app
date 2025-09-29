const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: String,
  text: String,
  options: [String],
  answerIndex: Number,
  marks: Number,
  negativeMark: Number,
  date: String // YYYY-MM-DD
});

module.exports = mongoose.model("Question", questionSchema);
