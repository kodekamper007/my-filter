const mongoose = require("mongoose");
const APIError = require('../errors/api.error')
const {
    BAD_REQUEST
} = require('../constants/http.status')
const { 
    GROUP_NAME_ALREADY_TAKEN,
    GROUP_FAILED_TO_UPDATE,
    GROUP_DOESNT_EXIST,
    GROUP_ALREADY_EXISTING
} = require('../constants/messages')

const GroupSchema = new mongoose.Schema({
  u_id_owner: {
    type: String
  },
  number_of_member: {
    type: String 
  },
  group_name: {
      type: String,
      unique: true,
      required: true
  },
  created_by: {
      type: String
  },
  updated_by: {
      type: String
  },
  last_modified_at: {
      type: Date,
      default: Date.now
  },
  action: {
      type: Boolean
  },
},
{
  versionKey: false
}
);

/**
 * Function to create group
 * @param fields needed to be used to create group
 * @returns Promise
 */
GroupSchema.methods.create = function (fields) {
  return new Promise((resolve, reject) => {
    try {
      const error = new APIError({
        message: GROUP_ALREADY_EXISTING,
        status: BAD_REQUEST,
        stack:  undefined,
      })
      const group = new Group(fields)
      group.save(function (err, new_group) {
        if (err) return reject(error)
          resolve(new_group)
        })
    } catch (exception) {
        reject(exception)
    }
  })
}

GroupSchema.methods.viewGroupList = function (user_id) {
  return new Promise ((resolve, reject) => {
    const query = Group.find()
    query.select("_id group_name created_by last_modified_at status")
    query.where("created_by").equals(user_id)
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

/**
 * Function to update group
 * @param group_id to be used to find a group
 * @param data to find and update
 * @returns Promise
 */

GroupSchema.methods.updateGroup = function (group_id, data){
  return new Promise ((resolve, reject) => {
    const group = Group.findOne({_id: group_id})
    if (!group) {
      throw new APIError({
        message: GROUP_DOESNT_EXIST,
         status: 404,
         stack: undefined,
      })
    }
    const query = Group.findOneAndUpdate(group_id, data)
      query.select()
      query.exec(async (error, result)=>{
        try {
          if(error){
            throw new APIError({
              message: GROUP_NAME_ALREADY_TAKEN,
              status: 404,
              stack: undefined,
            })
          }
          if(!result) {
            throw new APIError({
              message: GROUP_FAILED_TO_UPDATE, 
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

/**
 * Function to update group name
 * @param group_id to be used to find a group
 * @param group_name value to be patched
 * @returns Promise
 */
GroupSchema.methods.shouldUpdateGroupName = function (group_id, group_name){
    return new Promise (async (resolve, reject) => {
      try {
        let duplicate = await Group.find({group_name})
        if (duplicate) {
            duplicate = duplicate[0]
            if (duplicate.group_name === group_name && duplicate._id.toString() === group_id) {
                
            } else {
                throw new APIError({
                    message: GROUP_NAME_ALREADY_TAKEN, 
                    status: 417,
                    stack: undefined,
                })
            }
        }
        resolve (true)
      } catch (exception) {
         reject(exception)
        }
    })
}

/**
 * Function to update group name
 * @param group_id to be used to find a group
 * @returns Promise
 */
GroupSchema.methods.getGroupNameById = function (group_id) {
  return new Promise (async (resolve, reject) => {
    try {
      let group = await Group.findById(group_id)
        resolve (group)
    } catch (exception) {
      reject(exception)
    }
  })
}


const Group = mongoose.model("t_groups", GroupSchema);

module.exports = Group;
