const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const httpLogger = require('./utils/httpLogger');
const UserRoutes = require('./routes/userRoutes');
const userHistoryRoutes = require('./routes/userHistoryRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(httpLogger);

// const init = async () => {
//   await models.User.sync({ force: true }); // force true will drop the table if it already exists
//   logger.info("Tables have synced!");
// };

// init();
app.listen(4002, () => {
  logger.info('Running on port 4000');
});
// Users route
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/user_history', userHistoryRoutes);
