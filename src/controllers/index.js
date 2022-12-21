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
index.signupProcess = (req, res) => {
    const { id, pw, name } = req.body;

}
module.exports = index;