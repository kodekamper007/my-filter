// Function to generate JWT
const moment = require('moment-timezone')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../../config/vars')

/**
 * Function to generate JWT
 * @param {*} toSignContent the content that will be signed
 * @param {*} expiration the token expiration
 * @param {*} identifier the identifier of the token
 * @returns Object
 */
const generateToken = (toSignContent, expirationUnits, identifier = 'user') => {
  const expiration = 
    moment
      .tz(Date.now(), 'Asia/Manila')
      .add(expirationUnits.number, expirationUnits.unit)
      .format()
  toSignContent = { ...toSignContent, identifier }

  return {
    access_token: jwt.sign(
      toSignContent,
      APP_SECRET,
      { expiresIn: expirationUnits.expires_in }
    ),
    token_type: 'bearer',
    expires_in: expiration
  }
}

module.exports = generateToken
