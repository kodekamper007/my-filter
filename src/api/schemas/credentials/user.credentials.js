const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../../../config/vars')
const {
  ERROR_SETTINGS_SAVE,
  MEMBER_FAILED_TO_ADD,
  MEMBER_FAILED_TO_REMOVE
} = require('../../constants/messages')
const {
  BAD_REQUEST,
  NOT_ACCEPTABLE
} = require('../../constants/http.status')
const APIError = require('../../errors/api.error');
const { token } = require('morgan');
const UserCredentialSchema = new mongoose.Schema(
  {
    credential_id: {
      type: String
    },
    issuer_id: {
      type: String
    },
    user_id: {
      type: String,
      default: null
    },
    record_id: {
      type: String,
      default: null
    },
    fields: {
      type: Object
    },
    identifiers: {
      type: Object
    },
    is_scanned: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: null
    },
    deleted_at: {
      type: Date,
      default: null
    },
    group_id: {
      type: String,
      default: null
    }
  },
  {
    versionKey: false
  }
);

/**
 * Function to save settigns
 * @param {*} params the information to be saved
 * 
 * @return Promise|Exception
*/
UserCredentialSchema.methods.create = function (credentials) {
  return new Promise((resolve, reject) => {
    try {
      const error = new APIError({
        message: 'There was an error in saving your credentials.',
        status: BAD_REQUEST,
        stack:  undefined,
      })
      const credential = new UserCredential(credentials)
      credential.save(function (err, result) {
        if (err) throw error
        resolve(result._id)
      })
    } catch (exception) {
      reject(exception)
    }
  })
}

/**
 * Function to find a credential
 * @param identifier the identifier to be used to find a user 
 */
 UserCredentialSchema.methods.getCredential = function (identifier) {
  return new Promise(async (resolve, reject) => {
    try {
      const credential = await UserCredential.find(identifier)
      if (credential.length === 0) {
        throw new APIError({
          message: 'Credential not found.',
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

UserCredentialSchema.methods.modify = function (identifier, params) {
  return new Promise((resolve, reject) => {
    const query = UserCredential.findOneAndUpdate(identifier, params, { new: true })
    query.exec(async (error, result) => {
      try {
        if (error || result === null) {
          throw new APIError({
            message: 'There was an error in patching the credential',
            status: 500,
            stack:  undefined
          })
        }     
        resolve(result)
      } catch (exception) {
        reject(exception)
      }
    })
  })
}

/**
 * Function to add members to a group
 * @param group_id the group_id to be used to add members
 * @param member_ids list of issued members to add to group
 */
UserCredentialSchema.methods.addMembersToGroup = function (group_id, member_ids) {
    return new Promise((resolve, reject) => {
      const query = UserCredential.updateMany({_id: {$in: member_ids}}, {group_id})
      query.exec(async (error, result) => {
        try {
          if (error || result === null) {
            throw new APIError({
              message: MEMBER_FAILED_TO_ADD,
              status: 500,
              stack:  undefined
            })
          }     
          resolve(result)
        } catch (exception) {
          reject(exception)
        }
      })
    })
}

/**
 * Function to remove members to a group
 * @param identifier the _id to be used to remove members
 * @param group_id the groupid to be replace by null or basic group_id
 */
UserCredentialSchema.methods.removeMembersToGroup = function (u_id) {
  return new Promise((resolve, reject) => {
    const query = UserCredential.updateMany({_id: {$in: u_id}}, {group_id: null})
    query.exec(async (error, result) => {
      
      try {
        if (error || result === null) {
          throw new APIError({
            message: MEMBER_FAILED_TO_REMOVE,
            status: 500,
            stack:  undefined,      
          })
        }     
        resolve(result)
      } catch (exception) {
        reject(exception)
      }
    })
  })
}

UserCredentialSchema.methods.findByCredentialId = function (credential_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userCredential = await UserCredential.find({ credential_id })
        if (userCredential.length === 0) {
          throw new APIError({
            message: FIELDS_NOT_FOUND,
            status: NOT_FOUND,
            stack:  undefined,
          })
        }
        resolve(userCredential)
      } catch (exception) {
        reject(exception)
      }
    })
  }

/**
 * Function to add members to a group
 * @param offset to be used for page number
 * @param limit is set the limit of view member for page 
 */
UserCredentialSchema.methods.getMemberDetails = function({userId}) {
  return new Promise(async(resolve, reject) => {
    try {
      const result = await UserCredential.find({
        user_id: { $ne: null },
        issuer_id: { $eq: userId }
      })
      resolve(result)
    } catch(exception) {
      reject(exception)
    }
  })
}

UserCredentialSchema.methods.verify = function (token) {
    return jwt.decode(token) 
}

UserCredentialSchema.methods.getIssuedMembers = function(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const members = await UserCredential.find({
        user_id: { $ne: null },
        issuer_id: {$eq: userId}
      })
      resolve(members)
    } catch(exeception) {
      reject(exception)
    }
  })
}

/**
 * Function to get total members of the group
 * @param  group_id to be used to get group total member
 */
UserCredentialSchema.methods.getMembersCount = function(group_id){
  return new Promise((resolve, reject) => {
    const count =  UserCredential.count({group_id : group_id})
    try {
    resolve(count)
    } catch (exception) {
      reject(exception)
    } 
  })
}
/** ------
 * Function to fetch all members in the group
 * @param  group_id to be used to get group total member
 */
 UserCredentialSchema.methods.fetchGroupMembersID = function (group_id, issuer_id) {
  return new Promise ((resolve, reject) => {
    const query = UserCredential.find({issuer_id, group_id, user_id: {$ne: null}})
    query.select("user_id")
    query.exec(async (error, result)=>{
      try {
        if(error || result === null){
          throw new APIError({
            message: USER_NOT_FOUND,
            status: 404,
            stack: undefined,
          })
        }
        resolve(result)
      } catch (exception) {
        reject(exception)
      }
    })
  }) 
}
  
const UserCredential = mongoose.model("t_user_credentials", UserCredentialSchema);

module.exports = UserCredential;
