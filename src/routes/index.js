const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/index");

router.get('/', ctrl.home);

module.exports = router;