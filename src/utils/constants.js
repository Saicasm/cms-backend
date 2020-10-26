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
  userHistoryTypes: {
    USER_HISTORY_UPDATED: 'User history updated',
    NO_USER_HISTORIES: 'No user histories found',
    USER_HISTORY_ADDED: 'User history added',
    USER_HISTORY_DELETED: 'User history deleted',
    USER_HISTORY_FOUND_WITH_ID: 'User history found with id :',
    USER_HISTORY_NOT_FOUND_WITH_ID: 'User history not found with id : ',
    USER_HISTORY_FOR_USER_FOUND: 'User history  found for userId :',
    USER_HISTORY_FOR_USER_NOT_FOUND: 'User history not found for userId :',
    USERS_HISTORIES_RETRIEVED: 'User histories retrieved',
    USER_HISTORY_FOUND: 'User histories found',
  },
  tokenTypes: {
    TOKEN_UPDATED: 'token updated',
    NO_TOKEN_FOUND: 'No token found',
    TOKEN_ADDED: 'token added',
    TOKEN_DELETED: 'token deleted',
    TOKEN_FOUND_WITH_ID: 'token found with id :',
    TOKEN_NOT_FOUND_WITH_ID: 'token not found with id : ',
    TOKENS_RETRIEVED: 'tokens retrieved',
    TOKEN_FOUND: 'token found',
  },
  dbConnectionTypes: {
    CONNECTION_SUCCESS: 'Connection has been established successfully',
    CONNECTION_FAILURE: 'An error has occurred in establishing connection',
    DB_DEV_HOST: 'localhost',
    DB_DEV_DATABASE: 'cms_dev',
  },
};

module.exports = constants;
