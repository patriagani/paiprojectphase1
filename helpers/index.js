const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(9);

function encrypt(password){
    return bcrypt.hashSync(password, salt)
}
function checkHash(password,hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encrypt: encrypt,
    checkHash: checkHash
}