const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes/index');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
