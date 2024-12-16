// TODO: this is a mock db
const { projects } = require ('./projectController');

const { checkCredentials } = require('../utils/authUtils');

const getProjectIssues = (req, res) => {

    const token = req.cookies.authToken;
    if (!checkCredentials(token)) return res.status(401).json({ message: 'Unauthorized' });

    const projectId = req.params.id;
    const project = projects.find(p => p.id === parseInt(projectId, 10));

    if (!project) return res.status(404).json({ error: `Project with id ${projectId} not found`});

    res.json(project.issues);
}

module.exports = { getProjectIssues };