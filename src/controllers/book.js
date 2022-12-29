
const session = require('express-session');
const pool = require('../../db/db');
const book = {};

book.bookdetail = async (req, res)=>{
    const book = await pool.query('SELECT * FROM book WHERE book_id = ?', [req.params.book_id]);
    res.render('bookdetail', {
        book : book[0][0],
    });
}


module.exports = book;