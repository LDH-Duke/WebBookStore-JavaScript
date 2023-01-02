const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/mypage");

//mypage
router.get('/', ctrl.profile);

//card
router.get('/addcard', ctrl.addcard);
router.post('/addcard', ctrl.addcardProcess);

//address
router.get('/add_address', ctrl.addaddress);
module.exports = router;