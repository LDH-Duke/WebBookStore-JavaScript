const pool = require('../../db/db');
const mypage ={};

mypage.profile = async (req, res) => {
    const user =  await pool.query('SELECT * FROM user WHERE user_id=?', [req.session.sid]);
    const userCard = await pool.query("select * from user, card WHERE user.user_id = ? and user.user_id = card.user_user_id;", [req.session.sid]);
    console.log(userCard[0]);
    res.render('mypage', {
        user : user[0][0],
        userCard : userCard[0],
        
    });
    
}

//card
mypage.addcard = async (req, res)=>{
    res.render('addcard');
}

mypage.addcardProcess = async (req, res)=>{
    const {card_num, card_date,card_type,card_bank_name} = req.body;
    const userID = req.session.sid; //card 테이블에 user_id 외래키 값
    const cardCheck = await pool.query("SELECT * FROM card WHERE card_num =?", [card_num]);
    if(cardCheck[0].length===0){
        const query = "INSERT INTO card (card_num, card_date, card_type, card_bank_name, user_user_id) VALUES (?,?,?,?,?)";
        await pool.query(query, [
            card_num,
            card_date,
            card_type,
            card_bank_name,
            userID,
        ]);
        return res.send("<script>alert('카드 등록이 완료되었습니다.'); location.href='/mypage'</script>")
    }else{
        return res.send("<script>alert('동일한 카드가 존재합니다.'); location.href='/mypage'</script>")
    }
}

//address
mypage.addaddress = async (req, res)=>{
    res.render('add_address');
}


module.exports = mypage;