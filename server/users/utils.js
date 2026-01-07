const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// Test function
// const test = async () => {
//     const hashedPassword = await hashPassword("mypassword123");
    
//     const results = await comparePassword("mypassword123", hashedPassword);
//     console.log('Test result:', results); // Should be true
    
//     bcrypt.compare(
//         "123456789",
//         "$2b$10$AdBKNk.IvkCqaCELPNWP..oQCqrWWp2agtmzN2y23OWo7S1NWpd5S"
//     ).then(console.log)
// }

// test();

module.exports = { hashPassword, comparePassword };