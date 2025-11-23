
// controllers/assignmentController.js

const Assignment = require('../models/Assignment');

// This object holds all controller functions
const assignmentController = {
  // GET /assignments  -> list all assignments
  listAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.find().sort({ dueDate: 1 });

      res.render('assignments/index', {
        title: 'All Assignments',
        assignments: assignments
      });
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).send('Error fetching assignments from the database.');
    }
  },

  // GET /assignments/new  -> show create form
  showCreateForm: (req, res) => {
    res.render('assignments/new', {
      title: 'Add Assignment',
      assignment: {},
      errors: {}
    });
  },

  // POST /assignments  -> create a new assignment
  createAssignment: async (req, res) => {
    try {
      const { title, course, dueDate, status, notes } = req.body;

      if (!title || !course || !dueDate) {
        return res.render('assignments/new', {
          title: 'Add Assignment',
          assignment: { title, course, dueDate, status, notes },
          errors: { message: 'Title, course, and due date are required.' }
        });
      }

      await Assignment.create({
        title,
        course,
        dueDate,
        status: status || 'Not started',
        notes
      });

      res.redirect('/assignments');
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).send('Error creating assignment.');
    }
  },

  // GET /assignments/:id/edit  -> show edit form
  showEditForm: async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id);

      if (!assignment) {
        return res.status(404).send('Assignment not found');
      }

      res.render('assignments/edit', {
        title: 'Edit Assignment',
        assignment: assignment,
        errors: {}
      });
    } catch (error) {
      console.error('Error loading edit form:', error);
      res.status(500).send('Error loading the edit form.');
    }
  },

  // GET /assignments/:id/delete  -> show delete confirmation
  showDeleteConfirm: async (req, res) => {
    try {
      const assignment = await Assignment.findById(req.params.id);

      if (!assignment) {
        return res.status(404).send('Assignment not found');
      }

      res.render('assignments/delete', {
        title: 'Delete Assignment',
        assignment: assignment
      });
    } catch (error) {
      console.error('Error loading delete confirmation:', error);
      res.status(500).send('Error loading delete confirmation.');
    }
  },

  // POST /assignments/:id/delete  -> actually delete
  deleteAssignment: async (req, res) => {
    try {
      await Assignment.findByIdAndDelete(req.params.id);
      res.redirect('/assignments');
    } catch (error) {
      console.error('Error deleting assignment:', error);
      res.status(500).send('Error deleting assignment.');
    }
  },
    // POST /assignments/:id/edit  -> update an existing assignment
  updateAssignment: async (req, res) => {
    try {
      const { title, course, dueDate, status, notes } = req.body;

      await Assignment.findByIdAndUpdate(
        req.params.id,
        {
          title,
          course,
          dueDate,
          status,
          notes
        },
        { runValidators: true }
      );

      res.redirect('/assignments');
    } catch (error) {
      console.error('Error updating assignment:', error);
      res.status(500).send('Error updating assignment.');
    }
  }


  
};


module.exports = assignmentController;