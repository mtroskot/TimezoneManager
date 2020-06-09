export enum eIDName {
    USER_ID = 'id',
    TIMEZONE_ENTRY_ID = 'id'
}

export enum eIcons {
    GLOBE = 'globe',
    SETTINGS = 'settings',
    SEARCH = 'search',
    CLOSE = 'close',
    CLOSE_CIRCLE = 'close-circle',
    FILTER = 'list',
    LOGOUT = 'log-out',
    DOWN_ARROW = 'arrow-down',
    UP_ARROW = 'arrow-up',
    TRASH = 'trash',
    CREATE = 'create'
}

export enum eMessages {
    NO_INTERNET = 'No internet connection',
    TIMEOUT = 'Request timed out',
    DEFAULT_ERROR = 'Something went wrong',
    LOGIN_FAIL = 'Invalid email/password',
    EMAIL_IN_USE = 'Email Address already in use',
    NO_RESULTS = 'No Results Found',
    REGISTRATION_SUCCESS = 'Registration Success',
}


export enum eDropdowns {
    OWN_ENTRIES = 'OWN_TIMEZONE_ENTRIES',
    USERS = 'USERS',
    ALL_ENTRIES = 'ALL_TIMEZONE_ENTRIES'
};

export enum eFilters {
    CITY_NAME = 'CITY_NAME',
    ENTRY_NAME = 'ENTRY_NAME',
    GMT = 'GMT',
    FIRST_NAME = 'FIRST_NAME',
    LAST_NAME = 'LAST_NAME',
    EMAIL_ADDRESS = 'EMAIL_ADDRESS'
};

export enum eAuthScreenTestIDs {
    SWITCH_FORM= 'SWITCH_FORM',
    SUBMIT_LOGIN= 'SUBMIT_LOGIN',
    SUBMIT_REGISTER= 'SUBMIT_REGISTER',
    SUBMIT_USER_UPDATE= 'SUBMIT_USER_UPDATE',
    FIRST_NAME_INPUT= 'FIRST_NAME_INPUT',
    LAST_NAME_INPUT= 'LAST_NAME_INPUT',
    EMAIL_INPUT= 'EMAIL_INPUT',
    LOGIN_EMAIL_INPUT= 'LOGIN_EMAIL_INPUT',
    PASSWORD_INPUT= 'PASSWORD_INPUT',
    LOGIN_PASSWORD_INPUT= 'LOGIN_PASSWORD_INPUT',
    MATCHING_PASSWORD_INPUT= 'MATCHING_PASSWORD_INPUT'
}


export enum eAuthScreenText {
    LOGIN_HEADER = 'Welcome Back',
    REGISTER_HEADER = 'Create an Account',
    UPDATE_HEADER = 'Update user account',
    UPDATE_ACCOUNT = 'Update Account',
    CREATE_ACCOUNT = 'Create Account',
    LOGIN = 'Login',
    SWITCH_TO_REGISTER = "Don't have an account?",
    SWITCH_TO_LOGIN = 'Already have an account?'
}

export enum eUserRoles {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}