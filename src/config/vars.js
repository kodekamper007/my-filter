// import .env variables
require("dotenv").config({ path: "./.env" });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.APP_HOST || "0.0.0.0",
  PORT: process.env.APP_PORT || 3002,
  DB_NAME: process.env.APP_DB_NAME,
  DB_PORT: process.env.APP_DB_PORT,
  DB_URL: process.env.APP_DB_URL,
  DB_HOST: process.env.APP_DB_HOST,
  BUCKET: process.env.APP_AWS_BUCKET,
  KEY: process.env.APP_AWS_ACCESS_KEY_ID,
  BUCKET_SECRET: process.env.APP_AWS_SECRET_ACCESS_KEY,
  REGION: process.env.APP_AWS_DEFAULT_REGION,
  EMAIL: process.env.APP_EMAIL,
  EMAIL_USERNAME: process.env.APP_EMAIL_USER,
  EMAIL_PASS: process.env.APP_EMAIL_PASS,
  EMAIL_PORT: process.env.APP_EMAIL_PORT,
  EMAIL_HOST: process.env.APP_EMAIL_HOST,
  SMS_SHORT_CODE_MASK: process.env.APP_SMS_SHORT_CODE_MASK,
  SMS_APP_ID: process.env.APP_SMS_APP_ID,
  SMS_APP_SECRET: process.env.APP_SMS_APP_SECRET,
  SMS_APP_PASSPHRASE: process.env.APP_SMS_PASSPHRASE,
  SMS_APP_BASE_URL: process.env.APP_SMS_BASE_URL,
  APP_SECRET: process.env.APP_SECRET_TOKEN,
  URL: process.env.APP_URL
};
