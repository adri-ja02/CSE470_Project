const analyticsModel = require('../models/analyticsModel');

const categoryStats = async (req, res) => {
  try {
    const stats = await analyticsModel.getCategoryStats();
    res.json(stats);
  } catch (err) {
    console.error('Analytics category stats error:', err);
    res.status(500).json({ error: err.message });
  }
};

const applicationSuccessRate = async (req, res) => {
  try {
    const stats = await analyticsModel.getApplicationSuccessStats();
    const total = Number(stats.total_applications || 0);
    const accepted = Number(stats.accepted_count || 0);
    const rejected = Number(stats.rejected_count || 0);
    const successRate = total === 0 ? 0 : Number(((accepted / total) * 100).toFixed(2));

    res.json({ total, accepted, rejected, successRate });
  } catch (err) {
    console.error('Analytics success rate error:', err);
    res.status(500).json({ error: err.message });
  }
};

const companyHiringReport = async (req, res) => {
  try {
    const report = await analyticsModel.getCompanyHiringReport();
    res.json(report);
  } catch (err) {
    console.error('Analytics company hiring error:', err);
    res.status(500).json({ error: err.message });
  }
};

const monthlyPlacementReport = async (req, res) => {
  try {
    const report = await analyticsModel.getMonthlyPlacementReport();
    res.json(report);
  } catch (err) {
    console.error('Analytics monthly placement error:', err);
    res.status(500).json({ error: err.message });
  }
};

const analyticsSummary = async (req, res) => {
  try {
    const [categories, success, companyHiring, monthlyPlacement] = await Promise.all([
      analyticsModel.getCategoryStats(),
      analyticsModel.getApplicationSuccessStats(),
      analyticsModel.getCompanyHiringReport(),
      analyticsModel.getMonthlyPlacementReport()
    ]);

    const total = Number(success.total_applications || 0);
    const accepted = Number(success.accepted_count || 0);
    const rejected = Number(success.rejected_count || 0);
    const successRate = total === 0 ? 0 : Number(((accepted / total) * 100).toFixed(2));

    res.json({
      categoryStats: categories,
      applicationSuccess: { total, accepted, rejected, successRate },
      companyHiring: companyHiring,
      monthlyPlacement: monthlyPlacement
    });
  } catch (err) {
    console.error('Analytics summary error:', err);
    res.status(500).json({ error: err.message });
  }
};

const downloadAnalyticsSummary = async (req, res) => {
  try {
    const [categories, success, companyHiring, monthlyPlacement] = await Promise.all([
      analyticsModel.getCategoryStats(),
      analyticsModel.getApplicationSuccessStats(),
      analyticsModel.getCompanyHiringReport(),
      analyticsModel.getMonthlyPlacementReport()
    ]);

    const total = Number(success.total_applications || 0);
    const accepted = Number(success.accepted_count || 0);
    const rejected = Number(success.rejected_count || 0);
    const successRate = total === 0 ? 0 : Number(((accepted / total) * 100).toFixed(2));

    const payload = {
      categoryStats: categories,
      applicationSuccess: { total, accepted, rejected, successRate },
      companyHiring: companyHiring,
      monthlyPlacement: monthlyPlacement
    };

    const fileName = 'analytics-summary.json';
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error('Download analytics summary error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  categoryStats,
  applicationSuccessRate,
  companyHiringReport,
  monthlyPlacementReport,
  analyticsSummary,
  downloadAnalyticsSummary
};