const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const httpLogger = require('./utils/httpLogger');
const UserRoutes = require('./routes/userRoutes');
const userHistoryRoutes = require('./routes/userHistoryRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(httpLogger);

app.listen(4002, () => {
  logger.info('Running on port 4000');
});
// Users route
app.use('/api/v1/users', UserRoutes);
// UserHistory Route
app.use('/api/v1/user_history', userHistoryRoutes);
// Token route
app.use('/api/v1/token', tokenRoutes);
// Disease Route
app.use('/api/v1/disease', diseaseRoutes);
// Disease Route
app.use('/api/v1/symptom', symptomRoutes);
