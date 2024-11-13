const STUD_FIRST_NAME = "Ray";
const STUD_LAST_NAME = "Lin";
const STUD_FULL_NAME = STUD_FIRST_NAME + " " + STUD_LAST_NAME;
const STUD_INITIALS = STUD_FIRST_NAME[0] + STUD_LAST_NAME[0];
const STUD_ID = "33156859";
const STUD_ID_FIRST_2 = STUD_ID.slice(0, 2);

const APP_NAME = "MonoDeliver";
const PORT_NUMBER = 8080;
const LOG_FORMAT = "dev";
const MONGO_URL = "mongodb://localhost:27017";

const BASE_URL = "/" + STUD_ID + "/" + STUD_FIRST_NAME;
const API_URL = BASE_URL + "/api/v1";
const DRIVER_URL = API_URL + "/drivers";
const PACKAGE_URL = API_URL + "/packages";
const AUTH_URL = API_URL + "/auth";
const STATS_URL = API_URL + "/stats";

module.exports = {
    STUD_FIRST_NAME,
    STUD_LAST_NAME,
    STUD_FULL_NAME,
    STUD_INITIALS,
    STUD_ID,
    STUD_ID_FIRST_2,
    APP_NAME,
    PORT_NUMBER,
    LOG_FORMAT,
    MONGO_URL,
    BASE_URL,
    API_URL,
    DRIVER_URL,
    PACKAGE_URL,
    AUTH_URL,
    STATS_URL,
};
