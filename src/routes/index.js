const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/index");

//main view
router.get('/', ctrl.home);
//search
router.post('/', ctrl.searchProcess);

//login
router.get('/signin', ctrl.signin);
router.post('/signin', ctrl.signinProcess);

//signup
router.get('/signup', ctrl.signup);
router.post('/signup', ctrl.signupProcess);

//addbook
router.get('/addbook', ctrl.addbook);
router.post('/addbook', ctrl.addbookProcess);




module.exports = router;