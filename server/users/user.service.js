
const  User = require('./user.model');
const { hashPassword } = require('./utils');

const createUser = async (email , fullName, password) => {

    try {
    const newUser = new User({
        email, 
        fullName,
         password: await hashPassword(password)
    });
    console.log(newUser);
    await newUser.save();
    return newUser;
}
catch(err){
    console.error('Error in createUser:', err);
    throw err; 
}
}


module.exports ={createUser};