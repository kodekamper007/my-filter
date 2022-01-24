/**
 * Function to create a response
 * @param status 
 * @param message 
 * @param data 
 * @returns {Object}
 */
const responseBody = (status, message, data = []) => {
  return {
    status,
    message,
    data
  }
}

module.exports = {
  responseBody
}
