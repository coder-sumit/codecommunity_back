const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");


class JwtService {
    static sign(payload, expiry='86400s', secret=JWT_SECRET){
        return jwt.sign(payload, secret, {expiresIn: expiry});
    }
     
    static verify(token,secret=JWT_SECRET){
        return jwt.verify(token, secret);
    }
}

module.exports = JwtService;