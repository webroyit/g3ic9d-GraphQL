const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenHeader = req.get('Authorization');

    if(!tokenHeader){
        req.isLogin = false;
        // stop it from going to the next code
        return next();
    }

    const token = tokenHeader.split(" ")[1];
    let changeToken;

    try{
        changeToken = jwt.verify(token, 'practiceGraphql');
    }
    catch(err){
        res.isLogin = false;
        return next();
    }
    if(!changeToken){
        res.isLogin = false;
        return next();
    }
    req.accountId = changeToken.accountId;
    req.isLogin = true;
    next();
}