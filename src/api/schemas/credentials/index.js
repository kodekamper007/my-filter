const mongoose = require('mongoose');
const {
  ERROR_CREDENTIAL_SAVING,
  CREDENTIAL_NOT_FOUND,
  CREDENTIAL_ALREADY_EXISTS
} = require('../../constants/messages')
const {
  BAD_REQUEST,
  NOT_ACCEPTABLE
} = require('../../constants/http.status')
const APIError = require('../../errors/api.error')
const moment = require('moment-timezone')
const CredentialSchema = new mongoose.Schema(
  {
    type: {
      type: String
    },
    title: {
      type: String
    },
    theme: {
      type: String
    },
    validity: {
      type: Date,
      default: null
    },
    logo: {
      type: String,
      default: null
    },
    source_id: {
      type: String
    },
    issuer_id: {
      type: String
    },
    created_at: {
      type: Date,
      default: moment
        .tz(Date.now(), 'Asia/Manila')
        .format()
    },
    updated_at: {
      type: Date,
      default: null
    },
    deleted_at: {
      type: Date,
      default: null
    },
  },
  {
    versionKey: false
  }
);

/**
 * Function to create a credential record
 * @param {*} params the information to be saved
 * 
 * @return Promise|Exception
 */
CredentialSchema.methods.create = function (params) {
  return new Promise((resolve, reject) => {
    try {
      const credential = new Credential(params)
      const error = new APIError({
        message: ERROR_CREDENTIAL_SAVING,
        status: BAD_REQUEST,
        stack:  undefined,
      })
      credential.save((err, result) => {
        if (err) return reject(error)
        resolve(result._id)
      })
    } catch (exception) {
      reject(exception)
    }
  })
}

/**
 * Function to create a credential record
 * @param {*} params the information to be saved
 * 
 * @return Promise|Exception
 */
CredentialSchema.methods.getRecord = function (identifier) {
  return new Promise(async (resolve, reject) => {
    try {
      const credential = await Credential.findOne(identifier)
      if (credential === undefined) {
        throw new APIError({
          message: CREDENTIAL_NOT_FOUND,
          status: 404,
          stack:  undefined,
        })
      }
      resolve(credential)
    } catch (exception) {
      reject(exception)
    }
  })
}

/**
 * Function to create a credential record
 * @param {*} params the information to be saved
 * 
 * @return Promise|Exception
 */
 CredentialSchema.methods.getAll = function (identifier) {
  return new Promise(async (resolve, reject) => {
    try {
      const credential = await Credential.find(identifier)
      
      resolve(credential)
    } catch (exception) {
      reject(exception)
    }
  })
}

/**
 * Function to find the name of an existing credential
 * @param {*} identifier the identifier that will be used as condition
 * 
 * @return Promise|Exception
 */
CredentialSchema.methods.checkName = function (identifier) {
  return new Promise(async (resolve, reject) => {
    try {
      const credential = await Credential.findOne(identifier)
      if (credential === null) return resolve()
      throw new APIError({
        message: CREDENTIAL_ALREADY_EXISTS,
        status: NOT_ACCEPTABLE,
        stack:  undefined,
      })
    } catch (exception) {
      reject(exception)
    }
  })
}

/**
 * Function to find the name of an existing credential
 * @param {*} _id the identifier that will be used as condition
 * @return Promise|Exception
 */
CredentialSchema.methods.getTitle = function (_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let credential = await Credential.findById(_id)
        resolve(credential)
    } catch (exception) {
      reject(exception)
    }
  })
}

const Credential = mongoose.model("t_credentials", CredentialSchema);

module.exports = Credential;
