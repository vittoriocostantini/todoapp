import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: { // Add priority field
    type: String,
    enum: ['low', 'medium', 'high'], // Optional: restrict values to these options
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Task', taskSchema);