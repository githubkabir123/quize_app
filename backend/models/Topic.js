const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },

  // Title / Heading
  heading: { type: String, required: true },

  // Rich text content
  content: { type: String, default: '' },

  tags: [{ type: String }],
  linkedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  important: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, 
{ timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Topic', TopicSchema);
