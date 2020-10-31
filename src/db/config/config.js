const Sequelize = require('sequelize');
const constants = require('../../utils/constants');
const logger = require('../../utils/logger');
require('dotenv').config();

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env;
const seqDB = DB_NAME || constants.dbConnectionTypes.DB_DEV_DATABASE;
const seqHost = DB_HOST || constants.dbConnectionTypes.DB_DEV_HOST;
const sequelize = new Sequelize(seqDB, DB_USERNAME, DB_PASSWORD, {
  host: seqHost,
  dialect: constants.dbType.DB_POSTGRES,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

// This is used to check connection
sequelize
  .authenticate()
  .then(async () => {
    logger.info(constants.dbConnectionTypes.CONNECTION_SUCCESS);
    await sequelize.sync({alter: true});
    logger.info('All models were synchronized successfully.');
  })
  .catch((err) => {
    logger.error(constants.dbConnectionTypes.CONNECTION_FAILURE, err);
  });
module.exports = sequelize;
