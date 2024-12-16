const express = require('express');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/projects', authenticateToken, projectRoutes);

module.exports = router;