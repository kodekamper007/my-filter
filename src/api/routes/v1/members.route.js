const express = require("express");
const router = express.Router();
const membersController = require('../../controllers/members.controller')

// Route for issued members on creating group
router
  .route('/issued-members')
  .get(membersController.getMembers)

router
  .route('/manage-members')
  .get(membersController.getIssuedMembers)

router
  .route('/filter-members')
  .get(membersController.filterMembers)

module.exports = router
