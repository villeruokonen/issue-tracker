const express = require('express');
const { getProjects, getProjectIssues } = require('../controllers/projectController');

const router = express.Router();

router.get('/', getProjects);
router.get('/:id/issues', getProjectIssues);

module.exports = router;