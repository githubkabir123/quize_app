const express = require('express');
const Subject = require('../models/Subject');
const Topic = require('../models/Topic');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Create Subject
router.post('/subjects', protect, async (req, res) => {
  const { name } = req.body;
  const subject = new Subject({ userId: req.user.id, name });
  await subject.save();
  res.json(subject);
});

// ✅ Get All Subjects (User specific)
router.get('/subjects', protect, async (req, res) => {
  const subjects = await Subject.find({ userId: req.user.id });
  res.json(subjects);
});


// Add Topic
router.post('/topics', protect, async (req, res) => {
  const { subjectId, heading, content, tags, linkedTopics, important } = req.body;

  const topic = new Topic({
    userId: req.user.id,
    subjectId,
    heading,
    content,
    tags,
    linkedTopics,
    important
  });

  await topic.save();
  res.json(topic);
});

// Get all topics for a subject
router.get('/topics/:subjectId', protect, async (req, res) => {
  const topics = await Topic.find({ userId: req.user.id, subjectId: req.params.subjectId }).sort({ createdAt: -1 });
  res.json(topics);
});

// Get single topic
router.get('/topic/:id', protect, async (req, res) => {
  const topic = await Topic.findOne({ _id: req.params.id, userId: req.user.id });
  if (!topic) return res.status(404).json({ message: 'Topic not found' });
  res.json(topic);
});

// Update topic
router.put('/topic/:id', protect, async (req, res) => {
  const updatedTopic = await Topic.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updatedTopic);
});

// Delete topic
router.delete('/topic/:id', protect, async (req, res) => {
  await Topic.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Topic deleted successfully' });
});

module.exports = router;
