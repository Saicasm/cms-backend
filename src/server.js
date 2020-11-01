const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const httpLogger = require('./utils/httpLogger');
const UserRoutes = require('./routes/userRoutes');
const userHistoryRoutes = require('./routes/userHistoryRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
const clientUserRoutes = require('./routes/clientUserRoutes');
const statsRoutes = require('./routes/statisticsRoutes');
const constants = require('./utils/constants');
require('dotenv').config();

const app = express();
const baseUrl = process.env.BASE_URL || constants.apiTypes.BASE_URL;
app.use(bodyParser.json());
app.use(httpLogger);

app.use(cors());
app.listen(process.env.PORT || 4002, () => {
  logger.info('Running on port 4000');
});
// Users route
app.use(`${baseUrl}/user`, UserRoutes);
// UserHistory Route
app.use(`${baseUrl}/user-history`, userHistoryRoutes);
// Token route
app.use(`${baseUrl}/token`, tokenRoutes);
// Disease Route
app.use(`${baseUrl}/disease`, diseaseRoutes);
// Symptom Route
app.use(`${baseUrl}/symptom`, symptomRoutes);
// ClientUser Route
app.use(`${baseUrl}/client`, clientUserRoutes);
// Stats Route
app.use(`${baseUrl}/stats`, statsRoutes);
