const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/analytics/category-stats', analyticsController.categoryStats);
router.get('/analytics/application-success', analyticsController.applicationSuccessRate);
router.get('/analytics/company-hiring', analyticsController.companyHiringReport);
router.get('/analytics/monthly-placement', analyticsController.monthlyPlacementReport);
router.get('/analytics/summary', analyticsController.analyticsSummary);
router.get('/analytics/download', analyticsController.downloadAnalyticsSummary);

module.exports = router;