const STATUS = {
  OK: 'ok',
  CREATED: 'ok',
  BAD_REQUEST: 'fail',
  NOT_FOUND: 'fail',
  ERROR: 'error',
};

const SUCCESS_MESSAGES = {
  // User
  USER_FETCHED: 'User(s) fetched successfully',
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  USER_PAGINATED: 'Paginated users fetched successfully',
  BULK_UPSERT_COMPLETED: 'Bulk upsert completed successfully',

  // Auth
  LOGIN_ATTEMPTS_UPDATED: 'Max login attempts updated successfully',
  LOGIN_SUCCESS: 'Login successful',
  UNBLOCK_SUCCESS: 'User unblocked successfully',
  TOKEN_VALID: 'Token is valid',

  // Menu
  MENU_CREATED: 'Menu created successfully',
  MENU_FETCHED: 'Menu(s) fetched successfully',
  MENU_UPDATED: 'Menu updated successfully',
  MENU_DELETED: 'Menu deleted successfully',
  MENU_PAGINATED: 'Paginated menus fetched successfully',

  // Session
  SESSION_CREATED: 'Session created successfully',
  SESSION_FETCHED: 'Session(s) fetched successfully',
  SESSION_UPDATED: 'Session updated successfully',
  SESSION_DELETED: 'Session deleted successfully',
};

const ERROR_MESSAGES = {
  // User
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_DELETED: 'User already deleted',
  USER_ID_REQUIRED: 'User id is required',

  // Auth / Security
  ACCOUNT_LOCKED: 'Account is locked due to too many failed login attempts',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  ALREADY_UNBLOCKED: 'User is already unblocked',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  TOKEN_REQUIRED: 'Token is required',
  INVALID_TOKEN: 'Invalid token',
  INVALID_NUMBER: 'Invalid number',

  // Menu
  MENU_NOT_FOUND: 'Menu not found',

  // Session
  SESSION_NOT_FOUND: 'Session not found',

  // Validation
  ALL_FIELDS_REQUIRED: 'All fields are required.',
  INVALID_EMAIL_FORMAT: 'Invalid email format.',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  INVALID_GENDER: 'Invalid gender',
  INVALID_ARRAY_DATA_FORMAT: 'Invalid users data. Must be an array.',
  INVALID_OBJECT_DATA_FORMAT: 'Invalid users data. Must be an object.',

  // Generic
  SERVER_ERROR: 'Internal server error',
  BAD_REQUEST: 'Invalid request data',

  // Token
  TOKEN_REQUIRED: "Token is required",
  TOKEN_EXPIRED: "Token has expired",
  TOKEN_INVALID: "Invalid token",

  EMAIL_SEND_ERROR: "Email sending failed",
};

module.exports = {
  STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
};
