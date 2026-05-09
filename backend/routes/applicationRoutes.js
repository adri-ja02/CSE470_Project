const express = require('express')

const router = express.Router()

const {
    applyInternship,
    getApplications,
    withdrawApplication
} = require('../controllers/applicationController')

// APPLY
router.post('/', applyInternship)

// GET
router.get('/', getApplications)

// DELETE / WITHDRAW
router.delete('/:id', withdrawApplication)

module.exports = router