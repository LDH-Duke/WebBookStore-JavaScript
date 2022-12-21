
const index = {}

index.home = (req, res) => {
    res.render('index');
}

index.signin = (req, res) => {
    res.render('signin');
}

module.exports = index;