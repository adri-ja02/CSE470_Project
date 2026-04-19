const internshipModel = require('../models/internshipModel');

// ADD
const addInternship = async (req, res) => {
    try {
        const { title, deadline } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (new Date(deadline) < new Date()) {
            return res.status(400).json({ message: "Deadline must be future date" });
        }

        const internship = await internshipModel.createInternship(req.body);
        res.json(internship);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET
const getInternships = async (req, res) => {
    try {
        const data = await internshipModel.getAllInternships();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
const editInternship = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await internshipModel.updateInternship(id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
const removeInternship = async (req, res) => {
    try {
        const id = req.params.id;
        await internshipModel.deleteInternship(id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addInternship,
    getInternships,
    editInternship,
    removeInternship
};
