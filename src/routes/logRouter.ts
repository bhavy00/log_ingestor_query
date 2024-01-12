const express = require("express");
const logController = require("../controllers/logController");

const router = express.Router();

router.route("/").get(logController.searchLog).post(logController.createLog);

module.exports = router
