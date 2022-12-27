
const session = require('express-session');
const pool = require('../../db/db');

const index = {}

//main
index.home = async (req, res) => {

    if (req.session.sid) {
        res.render('index', {
            signinStatus: true,
        });
    } else {
        res.render('index', {
            signinStatus: false,
        });
    }

}

//login
index.signin = (req, res) => {
    if (req.session.sid) {
        req.session.destroy(function (err) {
            if (err) {
                console.log("error");
            } else {
                res.send("<script>alert('로그아웃 되었습니다.'); location.href='/';</script>");
            }
        })
    } else {
        res.render('signin');
    }

}

index.signinProcess = async (req, res) => {
    //1. 세션이 존재하는지 확인한다.(존재하면 삭제) 
    const { id, pw } = req.body;

    const loginCheck = await pool.query('SELECT*FROM user WHERE user_id=? AND user_pw=? ', [id, pw]);

    if (loginCheck[0].length === 1) {
        req.session.sid = id;
        req.session.save(function () {
            return res.send("<script>alert('로그인 되었습니다.'); location.href='/';</script>");
        });
    } else {
        return res.send("<script>alert('아이디 또는 비밀번호를 잘못 입력하였습니다.'); location.href='/signin';</script>");
    }

}

//signup
index.signup = async (req, res) => {
    res.render('signup');
}

index.signupProcess = async (req, res) => {
    const { id, pw, name } = req.body;

    const idCheck = await pool.query('SELECT * FROM user WHERE user_id = ?;', [id]);

    if (idCheck[0].length === 1) {
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

index.addbook = (req, res) => {
    // if (!req.session.sid) {
    //     res.send("<script>alert('로그인이 필요합니다.'); location.href='/'</script>");
    // }
    res.render('addbook');
}

index.addbookProcess = async (req, res) => {
    const { title, count, price } = req.body;
    //1. 도서가 존재하는지 확인 1-1. 존재 시 수량만 추가(제목 및 가격 동일) / 1-2. 미존재 시 그냥 등록
    const bookCheck = await pool.query('SELECT*FROM book WHERE book_name=? AND book_price=?;', [title, price]);

    //도서 존재 시 도서 수량추가 코드
    // if (bookCheck) {
    //     const query = 'UPDATE book SET book_count = book_count + ? WHERE book_name=? AND book_price=? VALUES (?,?,?);';
    //     pool.query(query, [
    //         count,
    //         title,
    //         price,
    //     ]);
    //     return res.send("<script>alert('도서가 추가되었습니다.'); location.href='/';</script>");
    // }
    const query = 'INSERT INTO book (book_name, book_count, book_price) VALUES (?,?,?);';
    pool.query(query, [
        title,
        count,
        price,
    ]);

    res.send("<script>alert('도서가 등록되었습니다.'); location.href='/';</script>");
}
module.exports = index;

