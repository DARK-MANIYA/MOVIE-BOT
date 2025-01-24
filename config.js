const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

//gg
module.exports = {
SESSION_ID: 'DARK-SHUTER-MD=RYpxwLiY#IqvPszJyKlnMzeU8Vn6JUagCudbbTCUUdw4G61bo1HY',
ANTI_DELETE: process.env.ANTI_DELETE === undefined ? 'true' : process.env.ANTI_DELETE, 
CHAT_BOT: process.env.CHAT_BOT === undefined ? 'true' : process.env.CHAT_BOT, 
DELETE_MSG_SENDTO: '94787318729',
SUDO: '',
GITHUB_AUTH_TOKEN: 'PpE2mjFlSn9MCg6JoskzWTiKNpePnn4FVYY6',
GITHUB_USER_NAME: 'sadassssr',

};
//GITHUB_AUTH_TOKEN: 'ouvnI0SDsmfWA1ilVxSZ0vJGYC5VX54U0e10',
