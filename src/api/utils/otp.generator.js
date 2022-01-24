const moment = require('moment-timezone')

/**
 * Function to generate OTP and OTP expiration
 * @param expirationDuration whole number 1-9 
 * @param timeUnit can be minutes, hours, or day/s 
 * @returns Object
 */
const otpGenerator = (expirationDuration, timeUnit) => {
  const otp  = Math.floor(100000 + Math.random() * 900000)
  const otp_expires_at = 
    moment
    .tz(Date.now(), 'Asia/Manila')
    .add(expirationDuration, timeUnit)
    .format()

  return {
    otp,
    otp_expires_at
  }
}

module.exports = otpGenerator
