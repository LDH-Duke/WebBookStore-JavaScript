const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/index");

//main view
router.get('/', ctrl.home);

//login
router.get('/signin', ctrl.signin);
router.post('/signin', ctrl.signinProcess);

//signup
router.get('/signup', ctrl.signup);
router.post('/signup', ctrl.signupProcess);



module.exports = router;