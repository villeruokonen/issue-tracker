const jwt = require('jsonwebtoken');

const { checkCredentials } = require('../controllers/authController');

// mock database
const projects = [
    {
        "id": 1,
        "name": "Project Alpha",
        "issues": [
            { "id": 101, "title": "Fix login bug", "status": "open" },
            { "id": 102, "title": "Add logout feature", "status": "in-progress" }
        ]
    },
    {
        "id": 2,
        "name": "Project Beta",
        "issues": [
            { "id": 201, "title": "Refactor API", "status": "open" }
        ]
    }
]

const getProjects = (req, res) => {
    /* AUTH
    const token = req.cookies.authToken;
    if (!checkCredentials(token)) return res.status(401).json({ message: 'Unauthorized' });
    */

    var trimIssues = projects.map((p) => ({
        ...p,
        issues: p.issues.map(issue => ({ id: issue.id }))
    }));

    res.json(trimIssues);
}

const getProjectIssues = (req, res) => {
    /* AUTH
    const token = req.cookies.authToken;
    if (!checkCredentials(token)) return res.status(401).json({ message: 'Unauthorized' });
    */

    const projectId = req.params.id;
    const project = projects.find(p => p.id === parseInt(projectId, 10));

    if (!project) return res.status(404).json({ error: `Project with id ${projectId} not found`});

    res.json(project.issues);
}

module.exports = { getProjects, getProjectIssues };