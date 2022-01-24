const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send({
    status: 200,
    message: "Successfully connected to endpoints.",
  });
});

module.exports = router;
