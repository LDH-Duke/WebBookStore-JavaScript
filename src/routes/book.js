const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/book");

//bookdetail
router.get('/:book_id', ctrl.bookdetail);

module.exports = router;