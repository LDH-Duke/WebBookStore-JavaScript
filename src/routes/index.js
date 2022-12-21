const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/index");

//main view
router.get('/', ctrl.home);

//login
router.get('/signin', ctrl.signin);

module.exports = router;