const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/formController');

// Form submission route
router.post('/contact', submitForm);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;