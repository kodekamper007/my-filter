const APIError                = require('../errors/api.error')
const { INVALID_PAYLOAD }     = require('../constants/http.status')
const { FILE_SIZE_ERROR } = require('../constants/messages')

/**
 * Function to check the mimetype of a file
 * @param file the file that came from the req body
 */
const sizeCheck = (fileSize, maxSize = 5000000) => {
  return new Promise((resolve, reject) => {
    if (fileSize > maxSize) {
      reject(new APIError({
        message: FILE_SIZE_ERROR,
        status: INVALID_PAYLOAD,
        stack:  undefined,
      }))
    }

    resolve()
  })
}

module.exports = {
  sizeCheck
}
