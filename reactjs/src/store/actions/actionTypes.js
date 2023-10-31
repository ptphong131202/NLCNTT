const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE', /// Action type change language

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    FETCH_EMAIL_START: 'FETCH_EMAIL_START',
    FETCH_EMAIL_SUCCESS: "FETCH_EMAIL_SUCCESS",
    FETCH_EMAIL_FAILED: "FETCH_EMAIL_FAILED",

    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",
    //  SAVE USER
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
    CREATE_USER_FAILED: "CREATE_USER_FAILED",
    // get user
    FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
    FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",
    // delete 
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
    DELETE_USER_FAILED: "DELETE_USER_FAILED",

    // edit user
    EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
    EDIT_USER_FAILED: "EDIT_USER_FAILED",

    //top doctor
    FETCH_TOP_DOCTOR_USERS_SUCCESS: "FETCH_TOP_DOCTOR_USERS_SUCCESS",
    FETCH_TOP_DOCTOR_USERS_FAILED: "FETCH_TOP_DOCTOR_USERS_FAILED",
})

export default actionTypes;