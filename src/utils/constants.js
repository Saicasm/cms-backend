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
    USER_WITH_NAME_NOT_FOUND: 'User NOT found with name :',
    USER_WITH_NAME_FOUND: 'User found with name :',
    USER_PARENT: 'Parent',
    USER_CHILD: 'Child',
    USER_OTHER: 'Other',
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
  diseaseTypes: {
    DISEASE_UPDATED: 'Disease updated',
    NO_DISEASES: 'No diseases found',
    DISEASE_ADDED: 'Disease added',
    DISEASE_DELETED: 'Disease deleted',
    DISEASE_FOUND: 'Disease found',
    DISEASE_FOUND_WITH_ID: 'Disease found with id :',
    DISEASE_NOT_FOUND_WITH_ID: 'Disease not found with id : ',
    DISEASES_RETRIEVED: 'Diseases retrieved',
  },
  adviceTypes: {
    ADVICE_UPDATED: 'ADVICE updated',
    NO_ADVICES: 'No ADVICEs found',
    ADVICE_ADDED: 'ADVICE added',
    ADVICE_DELETED: 'ADVICE deleted',
    ADVICE_FOUND: 'ADVICE found',
    ADVICE_FOUND_WITH_ID: 'ADVICE found with id :',
    ADVICE_NOT_FOUND_WITH_ID: 'ADVICE not found with id : ',
    ADVICES_RETRIEVED: 'ADVICEs retrieved',
  },
  medicineTypes: {
    MEDICINE_UPDATED: 'MEDICINE updated',
    NO_MEDICINES: 'No MEDICINEs found',
    MEDICINE_ADDED: 'MEDICINE added',
    MEDICINE_DELETED: 'MEDICINE deleted',
    MEDICINE_FOUND: 'MEDICINE found',
    MEDICINE_FOUND_WITH_ID: 'MEDICINE found with id :',
    MEDICINE_NOT_FOUND_WITH_ID: 'MEDICINE not found with id : ',
    MEDICINES_RETRIEVED: 'MEDICINEs retrieved',
  },
  symptomTypes: {
    SYMPTOM_UPDATED: 'Symptom updated',
    NO_SYMPTOMS: 'No symptoms found',
    SYMPTOM_ADDED: 'Symptom added',
    SYMPTOM_DELETED: 'Symptom deleted',
    SYMPTOM_FOUND: 'Symptom found',
    SYMPTOM_FOUND_WITH_ID: 'Symptom found with id :',
    SYMPTOM_NOT_FOUND_WITH_ID: 'Symptom not found with id : ',
    SYMPTOMS_RETRIEVED: 'Symptoms retrieved',
  },
  dbConnectionTypes: {
    CONNECTION_SUCCESS: 'Connection has been established successfully',
    CONNECTION_FAILURE: 'An error has occurred in establishing connection',
    DB_DEV_HOST: 'localhost',
    DB_DEV_DATABASE: 'cms_dev',
  },
  clientUserTypes: {
    CLIENT_USER_DOCTOR: 'Doctor',
    CLIENT_USER_RECEPTIONIST: 'Receptionist',
    CLIENT_USER_UPDATED: 'ClientUser updated',
    NO_CLIENT_USERS: 'No clientUser found',
    CLIENT_USER_ADDED: 'ClientUser added',
    CLIENT_USER_DELETED: 'ClientUser deleted',
    CLIENT_USER_FOUND: 'ClientUser found',
    CLIENT_USER_FOUND_WITH_ID: 'ClientUser found with id :',
    CLIENT_USER_NOT_FOUND_WITH_ID: 'ClientUser not found with id : ',
    CLIENT_USERS_RETRIEVED: 'ClientUsers retrieved',
  },
  statTypes: {
    STAT_UPDATED: 'Stat updated',
    NO_STATS: 'No Stat found',
    STAT_ADDED: 'Stat added',
    STAT_DELETED: 'Stat deleted',
    STAT_FOUND: 'Stat found',
    STAT_FOUND_WITH_ID: 'Stat found with id :',
    STAT_NOT_FOUND_WITH_ID: 'Stat not found with id : ',
    STATS_RETRIEVED: 'Stats retrieved',
  },
  apiTypes: {
    BASE_URL: '/api/v1',
  },
};

module.exports = constants;
