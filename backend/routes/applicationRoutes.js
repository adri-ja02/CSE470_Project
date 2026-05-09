const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/applications', applicationController.addApplication);
router.get('/applications', applicationController.getApplications);

module.exports = router;