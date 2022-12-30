const pool = require('../../db/db');
const mypage ={};

mypage.profile = async (req, res) => {
    const user =  await pool.query('SELECT * FROM user WHERE user_id=?', [req.session.sid]);
    
    res.render('mypage', {
        user : user[0][0],
    });
    
}


module.exports = mypage;