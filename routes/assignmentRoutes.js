// routes/assignmentRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller (we'll define it next)
const assignmentController = require('../controllers/assignmentController');

// Route: GET /assignments
router.get('/assignments', assignmentController.listAssignments);

// Route: GET /assignments/new  (show create form)
router.get('/assignments/new', assignmentController.showCreateForm);

router.post('/assignments', assignmentController.createAssignment);

// GET /assignments/:id/edit - show edit form
router.get('/assignments/:id/edit', assignmentController.showEditForm);

// GET /assignments/:id/delete - show confirmation page
router.get('/assignments/:id/delete', assignmentController.showDeleteConfirm);

// POST /assignments/:id/delete - perform delete
router.post('/assignments/:id/delete', assignmentController.deleteAssignment);

// POST /assignments/:id/edit - update assignment
router.post('/assignments/:id/edit', assignmentController.updateAssignment);




module.exports = router;
