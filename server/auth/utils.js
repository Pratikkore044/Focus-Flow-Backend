const jwt = require ('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

const signJwt =(payload) =>{
const token = jwt.sign(
    payload, jwtSecret,
    {
        expiresIn :'1d'
    }
)
return token;
}

const verifyJwt = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    return null;
  }
};

// console.log(data);
// console.log(token);

module.exports ={
    signJwt,
    verifyJwt
}