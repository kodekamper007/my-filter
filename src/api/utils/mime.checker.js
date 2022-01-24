const APIError                = require('../errors/api.error')
const { INVALID_PAYLOAD }     = require('../constants/http.status')
const { INVALID_PROFILE_PIC, INVALID_FILE } = require('../constants/messages')

/**
 * Function to check the mimetype of a file
 * @param file the file that came from the req body
 */
const mimeCheck = (file, allowed, type = 'single') => { 
  return new Promise((resolve, reject) => {
    if (!allowed.includes(file.mimetype)) {
      reject(new APIError({
        message: INVALID_PROFILE_PIC,
        status: INVALID_PAYLOAD,
        stack:  undefined,
      }))
      const result = (type === 'single')
        ? new APIError({
          message: INVALID_PROFILE_PIC,
          status: INVALID_PAYLOAD,
          stack:  undefined,
        })
        : INVALID_FILE
      reject(result)
    }

    resolve()
  })
}

module.exports = {
  mimeCheck
}
