
const session = require('express-session');
const pool = require('../../db/db');
const book = {};

book.bookdetail = (req, res)=>{
    const book = req.params;
    console.log(req.params);
    res.render('bookdetail', {
        book
    });
}


module.exports = book;