const applicationModel = require('../models/applicationModel');

const addApplication = async (req, res) => {
  try {
    const { internship_id, applicant_name } = req.body;

    if (!internship_id) {
      return res.status(400).json({ message: 'Internship ID is required' });
    }
    if (!applicant_name || !applicant_name.trim()) {
      return res.status(400).json({ message: 'Applicant name is required' });
    }

    const internship = await applicationModel.getInternshipById(internship_id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const application = await applicationModel.createApplication(req.body);
    res.json(application);
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ error: err.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const data = await applicationModel.getAllApplications();
    res.json(data);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addApplication,
  getApplications
};