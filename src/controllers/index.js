
const session = require('express-session');
const pool = require('../../db/db');

const index = {}

//main
index.home = async(req, res) => {

    if(req.session.sid){
        res.render('index',{
            signinStatus : true,
        });
    }else{
        res.render('index',{
            signinStatus:false,
        });
    }
    
}

//login
index.signin = (req, res) => {
    if(req.session.sid){
        req.session.destroy(function(err){
            if(err){
                console.log("error");
            }else{
                res.send("<script>alert('로그아웃 되었습니다.'); location.href='/';</script>");
            }
        })
    }else{
        res.render('signin');
    }
    
}

index.signinProcess = async (req, res) => {
    //1. 세션이 존재하는지 확인한다.(존재하면 삭제) 
    const {id, pw} = req.body;
    
    const loginCheck = await pool.query('SELECT*FROM user WHERE user_id=? AND user_pw=? ', [id,pw]);

    if(loginCheck[0].length===1){
        req.session.sid = id;
        req.session.save(function () {
            return res.send("<script>alert('로그인 되었습니다.'); location.href='/';</script>");
        });
    }else{
        return res.send("<script>alert('아이디 또는 비밀번호를 잘못 입력하였습니다.'); location.href='/signin';</script>");
    }
    
}

//signup
index.signup = async(req, res) => {
    res.render('signup');
}

index.signupProcess = async (req, res) => {
    const { id, pw, name } = req.body;

    const idCheck = await pool.query('SELECT * FROM user WHERE user_id = ?;', [id]);

    if (idCheck[0].length===1) {
        return res.send("<script>alert('아이디가 존재합니다.'); location.href='/signup';</script>")
    }
    const query = "INSERT INTO user (user_id, user_pw, user_name) VALUES (?,?,?);";

    pool.query(query, [
        id,
        pw,
        name,
    ]);
    res.send("<script>alert('회원가입이 완료되었습니다.'); location.href='/signin'</script>")
    

};

module.exports = index;

