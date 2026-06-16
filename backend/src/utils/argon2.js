const argon2 = require('argon2');

const hasdPass = async (password) =>{
    if (!password || typeof password !== 'string') {
        throw new Error('Password must be a valid string');
    }
    const hasd = await argon2.hash(password)
    return hasd;
}
const validatePass = async (hasd , password)=>{
    const valid = await argon2.verify(hasd, password);
    return valid;
}

module.exports = {
    hasdPass,
    validatePass
}