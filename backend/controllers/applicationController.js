const applicationModel = require('../models/applicationModel')

// APPLY
const applyInternship = async (req, res) => {
    try {
        const data = await applicationModel.createApplication(req.body)
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET ALL
const getApplications = async (req, res) => {
    try {
        const data = await applicationModel.getAllApplications()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// WITHDRAW
const withdrawApplication = async (req, res) => {
    try {
        const id = req.params.id

        await applicationModel.deleteApplication(id)

        res.json({
            message: 'Application withdrawn successfully'
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    applyInternship,
    getApplications,
    withdrawApplication
}