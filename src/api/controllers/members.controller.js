const memberService = require('../services/member.details.services')


exports.getMembers = async (request, response, next) => {
  return await memberService.getMembers(request, response, next)
}

exports.getIssuedMembers = async (request, response, next) => {
  return await memberService.getIssuedMembers(request, response, next)
}

exports.filterMembers = async (request, response, next) => {
    return await memberService.filterMembers(request, response, next)
  }
