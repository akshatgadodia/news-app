var jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const privateKey = process.env.SECRET_KEY
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        // throw new Error("Invalid token");
        res.status(401).json({error: "Invalid Token"});
    }
    const decodeToken = jwt.verify(token, privateKey)
    // console.log(decodeToken)
    req.userId = decodeToken.user_id
    req.userRole = decodeToken.role
    next()
}