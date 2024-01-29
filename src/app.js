const express = require('express');
const bodyParser = require('body-parser');

const { setupRoutes } = require('./routes');
const { handleErrors } = require('./utils');

const app = express();

app.use(bodyParser.json());
setupRoutes(app);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
app.use(handleErrors);

module.exports = app;
