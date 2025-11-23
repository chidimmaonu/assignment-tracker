// models/Assignment.js

const mongoose = require('mongoose');

// Define the structure of an Assignment document
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    course: {
      type: String,
      required: true,
      trim: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Not started', 'In progress', 'Done'],
      default: 'Not started'
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt
  }
);

// Create the model and export it
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
