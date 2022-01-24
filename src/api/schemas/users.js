const { resolve, reject } = require('bluebird');
const mongoose = require('mongoose');
const { search } = require('superagent');
const {
  USER_NOT_FOUND,
  UNAUTHORIZED,
} = require('../constants/messages')
const APIError = require('../errors/api.error')
const UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  photo: {
    type: String,
    default: null
  },
  role_id: {
    type: String,
  },
  otp: {
    type: String,
    default: null
  },
  u_id: {
    type: String,
    default: null
  },
  otp_expires_at: {
    type: Date,
    default: null
  },
  name_verified_at: {
    type: Date,
    default: null
  },
  mobile_verified_at: {
    type: Date,
    default: null
  },
  email_verified_at: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
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


UserSchema.index({first_name: 'text', last_name: 'text', mobile: 'text' });
/**
 * Function to find a user
 * @param identifier the identifier to be used to find a user 
 */
UserSchema.methods.getUser = function (identifier, mode = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.find(identifier)
      if (user.length === 0) {
        throw new APIError({
          message: (mode === 'auth') ? UNAUTHORIZED : USER_NOT_FOUND,
          status: (mode === 'auth') ? 401 : 404,
          stack:  undefined,
        })
      }
      resolve(user)
    } catch (exception) {
      reject(exception)
    }
  })
}

/**
 * Function to get all the members
 * @param user_id to find specific user
 */
UserSchema.methods.getByUserId = function (user_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = User.find({ user_id })
      query.select('first_name last_name mobile')
      query.exec((error, result) => {
        if (error) throw error
        resolve(result)
      })
    } catch (exception) {
    reject(exception)
    }
 })
}

/**
 * Function to get all the members
 * @param offset to be used for page number
 * @param limit is set the limit of view member for page
 * @param search the result of search
 */
UserSchema.methods.getAll = function ({offset, limit, search}) {
    return new Promise(async (resolve, reject) => {
      let query = {}
      if (search) {
          query = {$text: {$search: search}}
      }
      const users = await User.find(query).skip(offset).limit(limit)
      resolve(users)
    })
  }


/**
 * Function to get members name
 * @param user_id to be used getting of user name 
 * 
 */
UserSchema.methods.getMemberFullName = function (user_id) {
  return new Promise ((resolve , reject)=>{
    const query = User.find()
    query.select("first_name middle_name last_name mobile")
    query.where({_id: {$eq: user_id}})
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

const User = mongoose.model("t_users", UserSchema);

module.exports = User;
