const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/book");

//bookdetail
router.get('/bookdetail/:book', ctrl.bookdetail);

module.exports = router;