const Member = require('../schemas/credentials/user.credentials')
const Credential = require('../schemas/credentials/index')
const Group = require('../schemas/group.schema')
const cloneDeep = require('lodash.clonedeep')
const { responseBody } = require('../utils/response')
const {
  SUCCESS
} = require('../constants/http.status')
const Issuer = require('../schemas/issuers')


/**
 * Sample Documentation for sample function
 * Always follow this documentation pattern and do not
 * forget to put documentations in your code
 * @param {*} request native request object of express.js
 * @param {*} response native response object of express.js
 * @param {*} next native next object of express.js
 */
 exports.sample = (request, response, next) => {
    response.send({
      message: 'Sample',
      status: 200
    })
  }
  
/**
 * Create Group
 * @param {*} request native request object of express.js
 * @param {*} response native response object of express.js
 * @param {*} next native next object of express.js
 */
exports.getMembers = async (request, response, next) => {
  try {
    const member = new Member()
    const userId = request.user._id
    const members = await member.getMemberDetails({userId})
    const result = members.map((member) => {
        const {middle_name, email, ...data} = member.identifiers
        return { 
          ...data,
          _id: member._id
        }
    })
    
    response
      .status(200)
      .send(
        responseBody(
            SUCCESS,
            'List of Issued Members',
            result
        )
      )
    } catch (exception) {
      next (exception)
    }
}

exports.getIssuedMembers = async (request, response, next) => {
  try {
    const members = new Member()
    const groups = new Group()
    const creds = new Credential()
    let result = await members.getIssuedMembers(request.user._id)
    let data = await Promise.all(
      result.map(async(cred) => {
        let group_name = null
        if (cred.group_id) {
            const group = await groups.getGroupNameById(cred.group_id)
            if (group) {
                group_name = group.group_name !== undefined ? group.group_name : null
            }
        }
        let title = null
        if (cred.credential_id) {
            const credential = await creds.getTitle(cred.credential_id)
            if (credential) {
                title = credential.title !== undefined ? credential.title : null
            }
        }
        const { identifiers, created_at } = cred
        const { first_name, last_name, middle_name } = identifiers
        const body = cloneDeep({
            first_name,
            last_name,
            middle_name,
            group_name,
            created_at,
            title,
            _id: cred._id
          })
          title = null
          group_name = null
          
          return body
      })
    ) 

    response
      .status(200)
      .send(
        responseBody(
            SUCCESS,
            'List of Manage Members',
            data
          )
        )
  } catch (exception) {
    next (exception)
  }
}


//Dito ka magfilter ng credentials 
exports.filterMembers = async (request, response, next) => {
  
    try {


    response
      .status(200)
      .send(
        responseBody(
            SUCCESS,
            'Filtered Data',
            filteredData
        )
      )
  } catch (exception) {
    next (exception)
  }
}

