const express = require("express");
const router = express.Router();
const mainRoutes = require("./main.route");
const issuerRoutes = require("./issuers.route");

router.use("/", mainRoutes); // GET /api
router.use("/issuers", issuerRoutes); // GET /api/issuer
module.exports = router;
