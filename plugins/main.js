const config = require('../config')
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "alive",
    react: "💁‍♂️",
    alias: ["online","test","bot"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
let monspacenew ='`'
if(config.ALIVE === "default") {
const buttons = [
  {buttonId: prefix + 'menu' , buttonText: {displayText: '𝘊𝘖𝘔𝘔𝘈𝘕𝘋 𝘔𝘌𝘕𝘜'}, type: 1},
  {buttonId: prefix + 'ping' , buttonText: {displayText: '𝘉𝘖𝘛 𝘚𝘗𝘌𝘌𝘋'}, type: 1}
]
const buttonMessage = {
    image: {url: config.LOGO},
    caption: `*_HYPER MOVIE BOT ONLINE NOW 🎬_*

*This project is privately, this project acsses only our team members..💁‍♂️*`,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
return await conn.buttonMessage2(from, buttonMessage)}
else {
  const buttons = [
    {buttonId: prefix + 'menu' , buttonText: {displayText: '𝘊𝘖𝘔𝘔𝘈𝘕𝘋 𝘔𝘌𝘕𝘜'}, type: 1},
    {buttonId: prefix + 'ping' , buttonText: {displayText: '𝘉𝘖𝘛 𝘚𝘗𝘌𝘌𝘋'}, type: 1}
  ]
  const buttonMessage = {
      image: {url: config.LOGO},
      caption: config.ALIVE,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 4
  }
  return await conn.buttonMessage2(from, buttonMessage, mek)}
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "ping",
    //react: "📍",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: 'Speed Test :)'  }, { quoted: mek } )
var final = new Date().getTime();
await conn.edite(ping, '*Pong 🏓*\n *' + (final - inital) + ' ms* ' )
   await conn.sendMessage(from, { react: { text: '📍', key: mek.key } }); 
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
  pattern: "menu",
  react: "🎬",
  alias: ["panel","list","commands"],
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
const buttons = [
{buttonId: prefix + 'mainmenu' , buttonText: {displayText: '𝘔𝘈𝘐𝘕 𝘊𝘖𝘔𝘔𝘈𝘕𝘋𝘚'}, type: 1},
{buttonId: prefix + 'groupmenu' , buttonText: {displayText: '𝘎𝘙𝘖𝘜𝘗 𝘊𝘖𝘔𝘔𝘈𝘕𝘋𝘚'}, type: 1},
{buttonId: prefix + 'moviemenu' , buttonText: {displayText: '𝘔𝘖𝘝𝘐𝘌 𝘊𝘖𝘔𝘔𝘈𝘕𝘋𝘚'}, type: 1},
{buttonId: prefix + 'downloadmenu' , buttonText: {displayText: '𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋 𝘊𝘖𝘔𝘔𝘈𝘕𝘋𝘚'}, type: 1},
{buttonId: prefix + 'othermenu' , buttonText: {displayText: '𝘖𝘛𝘏𝘌𝘙 𝘊𝘖𝘔𝘔𝘈𝘕𝘋𝘚'}, type: 1} ,  
{buttonId: prefix + 'aimenu' , buttonText: {displayText: '𝘈𝘐 𝘊𝘖𝘔𝘔𝘈𝘕𝘋𝘚'}, type: 1}
]
const buttonMessage = {
  image: {url: config.LOGO},
  caption: `*\`🎬HYPER MOVIE DOWNLODER🎬\`*

> *ᴜᴘᴛɪᴍᴇ :* ${runtime(process.uptime())}
> *ʀᴀᴍ ᴜꜱꜱᴀɢᴇ :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> *ᴘʟᴀᴛꜰᴏʀᴍ :* ${hostname}
> *ᴠᴇʀꜱɪᴏɴ :* ${require("../package.json").version}

*💁‍♂️ This bot project can used _HYPER TEAM_ members. This is private bot and this bot using uploading our groups..*`,
  footer: config.FOOTER,
  buttons: buttons,
  headerType: 4
}
return await conn.buttonMessage2(from, buttonMessage, mek)
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
        pattern: "restart",
    react: "🔄",
        desc: "To restart bot",
        category: "owner",
        filename: __filename
    },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isSachintha, isSavi, isSadas, isMani, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isSachintha && !isSavi && !isSadas && !isMani && !isMe)return;
    try{    const { exec } = require("child_process")
            reply('*Restart all funtions and now started bot 🔄*')
            exec('pm2 restart all')
} catch (e) {
reply('*Error !!*')
l(e)
}
})



cmd({
  pattern: "groupmenu",
  react: "🏓",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*🏓GROUP COMMANDS MENU🏓*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
menuc += `*🪁Command :* ${commands[i].pattern}
*💭Desc :* ${commands[i].desc}
*🙇🏻‍♂️Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})
cmd({
  pattern: "mainmenu",
  react: "🏓",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*🏓MAIN COMMANDS MENU🏓*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
if(!commands[i].dontAddCommandList){
menuc += `*🪁Command :* ${commands[i].pattern}
*💭Desc :* ${commands[i].desc}
*🙇🏻‍♂️Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})
cmd({
  pattern: "moviemenu",
  react: "🏓",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*🏓MOVIE COMMANDS MENU🏓*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'movie'){
if(!commands[i].dontAddCommandList){
menuc += `*🪁Command :* ${commands[i].pattern}
*💭Desc :* ${commands[i].desc}
*🙇🏻‍♂️Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "downloadmenu",
  react: "🏓",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*🏓DOWNLOAD COMMANDS MENU🏓*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
if(!commands[i].dontAddCommandList){
menuc += `*🪁Command :* ${commands[i].pattern}
*💭Desc :* ${commands[i].desc}
*🙇🏻‍♂️Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})
cmd({
  pattern: "othermenu",
  react: "🏓",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*🏓OTHER COMMANDS MENU🏓*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
if(!commands[i].dontAddCommandList){
menuc += `*🪁Command :* ${commands[i].pattern}
*💭Desc :* ${commands[i].desc}
*🙇🏻‍♂️Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})

cmd({
  pattern: "aimenu",
  react: "🏓",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*🏓AI COMMANDS MENU🏓*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'ai'){
if(!commands[i].dontAddCommandList){
menuc += `*🪁Command :* ${commands[i].pattern}
*💭Desc :* ${commands[i].desc}
*🙇🏻‍♂️Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'GET BOT SCRIPT'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'GET BOT PING'
    },
    type: 1
  }]
let buttonMessaged = {
  image: { url: config.LOGO },
  caption: menuc,
  footer: config.FOOTER,
  headerType: 4,
  buttons: generatebutton
};
return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
reply('*ERROR !!*')
l(e)
}
})







cmd({
    pattern: "system",
    //react: "🧬",
    alias: ["status"],
    desc: "Check bot system status.",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react}) => {
try{
   

if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()


const rtime = await runtime(process.uptime())

const txt =`*🎬 𝘏𝘠𝘗𝘌𝘙 𝘔𝘖𝘝𝘐𝘌 𝘋𝘓 𝘚𝘠𝘚𝘛𝘌𝘔 𝘐𝘕𝘍𝘖 🎬*

> *⏰ 𝚁𝚄𝙽 𝚃𝙸𝙼𝙴 :* ${runtime(process.uptime())}
> *📟 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> *📡 𝙿𝙻𝙰𝚃𝙵𝙾𝚁𝙼 :* ${hostname}
> *💁‍♂️ 𝙼𝙰𝙳𝙴 𝙱𝚈 :* ʜʏᴘᴇʀ ᴛᴇᴀᴍ`
reply(txt)
      m.react('🏓')
    
} catch (e) {
    reply('*Error !!*')
    console.log(e)
}
})

