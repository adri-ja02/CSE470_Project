const express = require('express');
const router = express.Router();

const {
    addInternship,
    getInternships,
    editInternship,
    removeInternship
} = require('../controllers/internshipController');

// ROUTES
router.post('/internships', addInternship);
router.get('/internships', getInternships);
router.put('/internships/:id', editInternship);
router.delete('/internships/:id', removeInternship);

module.exports = router;
