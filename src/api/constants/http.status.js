const httpStatus = require("http-status")

// HTTP Status codes
module.exports = {
  CREATED: httpStatus.CREATED,
  SUCCESS: httpStatus.OK,
  INTERNAL_SERVER_ERROR: httpStatus.INTERNAL_SERVER_ERROR,
  NOT_FOUND: httpStatus.NOT_FOUND,
  BAD_REQUEST: httpStatus.BAD_REQUEST,
  UNAUTHENTICATED: httpStatus.UNAUTHORIZED,
  FORBIDDEN: httpStatus.FORBIDDEN,
  INVALID_PAYLOAD: httpStatus.INVALID_PAYLOAD,
  NOT_ACCEPTABLE: httpStatus.NOT_ACCEPTABLE
}
