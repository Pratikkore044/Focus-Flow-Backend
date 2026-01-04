const { verifyJwt } = require("../auth/utils");
const { formatResponse } = require("../utils/formatResponse");

const validateUser = (req, res, next) => {

    const bearerToken = req.headers['authorization'];

    try {
          if (!bearerToken) {
          throw new Error('Token not found');
    }
        const token = bearerToken.replace('Bearer ', '');
        const userInfo = verifyJwt(token);

        if (!userInfo) {
            throw new Error('Invalid or expired token');
        }

        req.user = userInfo;
        next();
    }  catch (err) {
        console.error(err)
        return formatResponse(res, null, null, new Error("User is not authorized"), 401);
    
    }
} 
module.exports = validateUser;