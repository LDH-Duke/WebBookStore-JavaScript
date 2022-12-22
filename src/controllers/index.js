const e = require('express');
const pool = require('../../db/db');

const index = {}

//main
index.home = (req, res) => {
    res.render('index');
}

//login
index.signin = (req, res) => {
    res.render('signin');
}

//signup
index.signup = (req, res) => {
    res.render('signup');
}
index.signupProcess = async (req, res) => {
    const { id, pw, name } = req.body;

    const idCheck = await pool.query('SELECT * FROM user WHERE user_id = ?;', [id]);
    console.log(idCheck[0]);

    if (idCheck[0][0]) {
        console.log("아이디가 존재합니다.");
    } else {
        const query = "INSERT INTO user (user_id, user_pw, user_name) VALUES (?,?,?);";

        pool.query(query, [
            id,
            pw,
            name,
        ]);
        console.log("회원가입이 완료되었습니다.")
    };


}
module.exports = index;