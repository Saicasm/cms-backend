const constants = {
  dbType: {
    DB_MYSQL: 'mysql',
    DB_POSTGRES: 'postgres',
    DB_MONGO: 'mongo',
  },
  errorTypes: {
    ERROR_INPUT_VALUE: 'Please input a valid numeric value',
  },
  userTypes: {
    USER_UPDATED: 'User updated',
    NO_USERS: 'No users found',
    USER_ADDED: 'User added',
    USER_DELETED: 'User deleted',
    USER_FOUND_WITH_ID: 'User found with id :',
    USER_NOT_FOUND_WITH_ID: 'User not found with id : ',
    USERS_RETRIEVED: 'Users retrieved',
    USER_FOUND: 'User found',
    USER_WITH_PHONE_NOT_FOUND: 'User not found with phoneNo :',
    USER_WITH_PHONE_FOUND: 'User found with phoneNo :',
  },
  dbConnectionTypes: {
    CONNECTION_SUCCESS: 'Connection has been established successfully',
    CONNECTION_FAILURE: 'An error has occurred in establishing connection',
    DB_DEV_HOST: 'localhost',
    DB_DEV_DATABASE: 'cms_dev',
  },
};

module.exports = constants;
