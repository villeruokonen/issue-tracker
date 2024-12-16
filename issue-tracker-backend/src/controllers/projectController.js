const { checkCredentials } = require('../utils/authUtils');

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
    const token = req.cookies.authToken;
    if (!checkCredentials(token)) return res.status(401).json({ message: 'Unauthorized' });

    var trimIssues = projects.map((p) => ({
        ...p,
        issues: p.issues.map(issue => ({ id: issue.id }))
    }));

    res.json(trimIssues);
}

module.exports = { getProjects, projects };