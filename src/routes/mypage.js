const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/mypage");

//mypage
router.get('/', ctrl.profile);


module.exports = router;