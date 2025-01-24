const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")

var tesadtag =''
if(config.LANG === 'SI') tesadtag = '*මට settings update කිරීමට text එකක් දෙන්න. !*'
else tesadtag = '*Give me text to update settings !*'

var desc1 = ''
if(config.LANG === 'SI') desc1 = "එය groups settings fetures යාවත්කාලීන කරයි."
else desc1 = "It updates groups setting fetures."

var desc2 = ''
if(config.LANG === 'SI') desc2 ="එය bot\'s settings යාවත්කාලීන කරයි."
else desc2 = "It updates එය bot\'s  setting."

var desc3 = ''
if(config.LANG === 'SI') desc3 = "එය bot\'s configs යාවත්කාලීන කරයි."
else desc3 = "It updates එය bot\'s  configs."

var ONLGROUP = ''
if(config.LANG === 'SI') ONLGROUP = "*මෙය group එකක් නොවේ !*"
else ONLGROUP = "*This is not a group !*"

var ADMIN = ''
if(config.LANG === 'SI') ADMIN = "*ඔබ admin නොවේ !*"
else ADMIN = "*You are not an admin !*"

var ADMINim = ''
if(config.LANG === 'SI') ADMINim = "*මම admin නොවේ !*"
else ADMINim = "*Im not an admin !*"

var BOTOW = ''
if(config.LANG) BOTOW = "*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*"
else BOTOW = "*You are not bot\'s owner or moderator !*"

var alredy = 'This setting alredy updated!'
if(config.LANG) alredy = "මෙම සැකසුම...."

cmd({
    pattern: "group",
    //react: "⚙️",
    alias: ["groupset",'groupsettings'],
    desc: desc1,
    category: "owner",
    use: '.group',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isGroup) return await reply(ONLGROUP)
if (!isAdmins) return await reply(ADMIN)
if (!isBotAdmins) return await reply(ADMINim)

const sections = [{
title: "ANTI_LINK",
rows: [{
title: 'ON ⚒️',
rowId: '.antilink on'
},
{
title: 'OFF ⚒️',
rowId: '.antilink off'
}
]},
{
title: "ANTI_BAD",
rows: [{
title: 'ON ⚒️',
rowId: '.antibad on'
},
{
title: 'OFF ⚒️',
rowId: '.antibad off'
}
]},
{
title: "ANTI_BOT",
rows: [{
title: 'ON ⚒️',
rowId: '.antibot on'
},
{
title: 'OFF ⚒️',
rowId: '.antibot off'
}
]},
    
]
const listMessage = {
text: `*⚙️ DARK SHUTER SETTINGS ⚙️*

_*⚒️ Select settings what you want to on or off*_`,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
await conn.listMessage(from, listMessage,mek)
       m.react('⚙️')
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "settings",
    //react: "⚙️",
    alias: ["setting",'botsetting'],
    desc: desc2,
    category: "owner",
    use: '.settings',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
const sections = [
  {
title: "MODE",
rows: [{
title: 'PRIVATE ☑️',
rowId: '.pv on'
},
{
title: 'PUBLIC ☑️',
rowId: '.pv off'
}
]},  
{
title: "ONLY GROUP",
rows: [{
title: 'ON ☑️',
rowId: '.onlygroup on'
},
{
title: 'OFF ☑️',
rowId: '.onlygroup off'
}
]},
{
title: "AUTO_STATUS_READ",
rows: [{
title: 'ON ☑️',
rowId: '.autos on'
},
{
title: 'OFF ☑️',
rowId: '.autos off'
}
]},
 {
title: "AUTO_MSG_READ",
rows: [{
title: 'ON ☑️',
rowId: '.autoread on'
},
{
title: 'OFF ☑️',
rowId: '.autoread off'
}
]},
 {
title: "AUTO_RECORDING",
rows: [{
title: 'ON ☑️',
rowId: '.autorec on'
},
{
title: 'OFF ☑️',
rowId: '.autorec off'
}
]},
 {
title: "AUTO_TYPING",
rows: [{
title: 'ON ☑️',
rowId: '.autotyping on'
},
{
title: 'OFF ☑️',
rowId: '.autotyping off'
}
]},
 {
title: "READ_ONLY_COMMANDS",
rows: [{
title: 'ON ☑️',
rowId: '.ronly on'
},
{
title: 'OFF ☑️',
rowId: '.ronly off'
}
]},
{
title: "AUTO_BLOCK",
rows: [{
title: 'ON ☑️',
rowId: '.autoblock on'
},
{
title: 'OFF ☑️',
rowId: '.autoblock off'
}
]},
{
title: "ANTI_CALL",
rows: [{
title: 'ON ☑️',
rowId: '.anticall on'
},
{
title: 'OFF ☑️',
rowId: '.anticall off'
}
]},
{
title: "AUTO_REACT",
rows: [{
title: 'ON ☑️',
rowId: '.autoreact on'
},
{
title: 'OFF ☑️',
rowId: '.autoreact off'
}
]},
 {
title: "AI_CHAT",
rows: [{
title: 'ON ☑️',
rowId: '.chatbot on'
},
{
title: 'OFF ☑️',
rowId: '.chatbot off'
}
]},
{
title: "ANTI_DELETE",
rows: [{
title: 'ON ☑️',
rowId: '.antdel on'
},
{
title: 'OFF ☑️',
rowId: '.antdel off'
}
]} 
    
]
const listMessage = {
text: `*\`⚙️ HYPER MOVIE DL SETTINGS ⚙️\`*

_*🔮Select settings what you want to on or off.*_`,
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
await conn.listMessage(from, listMessage,mek)
       m.react('⚙️')
} catch (e) {
reply('*Error !!*')
l(e)
}
})



cmd({
    pattern: "jblock",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 


const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}

if(q === "on"){
if(await isAnti("JID_BLOCK")) return 
let olddata = await get("JID_BLOCK")
olddata.push(from)
await input("JID_BLOCK", olddata)
await reply("*HYPER MOVIE DL blocked this chat ❌*")
} else {
if(!await isAnti("JID_BLOCK")) return 
const array = await get("JID_BLOCK")
const itemToRemove = from
const indexToRemove = array.indexOf(itemToRemove);
if (indexToRemove !== -1) {
  array.splice(indexToRemove, 1);
}
await input("JID_BLOCK", array)
await reply("*HYPER MOVIE DL unblocked this chat ✅*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}
})



































cmd({
  alias: ["apply"],
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
    
let dat = `*👾 DATABASE INFO CHANGE 👾*`
const buttons = [
  {buttonId: prefix + 'alivemg ' + q, buttonText: {displayText: 'Change bot alive massege ⛁'}, type: 1},
  {buttonId: prefix + 'setlogo ' + q, buttonText: {displayText: 'Change logo ⛁'}, type: 1},
     {buttonId: prefix + 'setprefix ' + q, buttonText: {displayText: 'Change bot prefix ⛁'}, type: 1},
     {buttonId: prefix + 'resetdb ' + q, buttonText: {displayText: 'Reset default ⛁'}, type: 1}
]
  const buttonMessage = {
      image: {url: config.LOGO},
      caption: dat,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 1
  }
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
reply(N_FOUND)
l(e)
}
})
//============================================================================================================

cmd({
    pattern: "antilink",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("ANTI_LINK")
if(gett === true) return await reply(alredy)
await input("ANTI_LINK", true)
await reply("*💁‍♂️ ANTI_LINK ➨* on")
} else{
let gett = await get("ANTI_LINK")
if(gett === false) return await reply(alredy)
await input("ANTI_LINK", false)
await reply("*💁‍♂️ ANTI_LINK ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})


cmd({
    pattern: "antdel",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("ANTI_DELETE")
if(gett === true) return await reply(alredy)
await input("ANTI_DELETE", true)
await reply("*💁‍♂️ ANTI_DELETE ➨* on")
} else{
let gett = await get("ANTI_DELETE")
if(gett === false) return await reply(alredy)
await input("ANTI_DELETE", false)
await reply("*💁‍♂️ ANTI_DELETE ➨* on")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})

cmd({
    pattern: "chatbot",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("CHAT_BOT")
if(gett === true) return await reply(alredy)
await input("CHAT_BOT", true)
await reply("*💁‍♂️ AI_CHAT ➨* on")
} else{
let gett = await get("CHAT_BOT")
if(gett === false) return await reply(alredy)
await input("CHAT_BOT", false)
await reply("*💁‍♂️ AI_CHAT ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})




























cmd({
    pattern: "antibot",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("ANTI_BOT")
if(gett === true) return await reply(alredy)
await input("ANTI_BOT", true)
await reply("*💁‍♂️ ANTI_BOT ➨* on")
} else{
let gett = await get("ANTI_BOT")
if(gett === false) return await reply(alredy)
await input("ANTI_BOT", false)
await reply("*💁‍♂️ ANTI_BOT ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})



















cmd({
    pattern: "antibad",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("ANTI_BAD")
if(gett === true) return await reply(alredy)
await input("ANTI_BAD", true)
await reply("*💁‍♂️ ANTI_BAD ➨* on")
} else{
let gett = await get("ANTI_BAD")
if(gett === false) return await reply(alredy)
await input("ANTI_BAD", false)
await reply("*💁‍♂️ ANTI_BAD ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})

cmd({
    pattern: "onlygroup",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("ONLY_GROUP")
if(gett === true) return await reply(alredy)
await input("ONLY_GROUP", true)
await reply("*💁‍♂️ ONLY_GROUP ➨* on")
} else{
let gett = await get("ONLY_GROUP")
if(gett === false) return await reply(alredy)
await input("ONLY_GROUP", false)
await reply("*💁‍♂️ ONLY_GROUP ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})

cmd({
    pattern: "autoreact",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("AUTO_REACT")
if(gett === true) return await reply(alredy)
await input("AUTO_REACT", true)
await reply("*💁‍♂️ AUTO_REACT ➨* on")
} else{
let gett = await get("AUTO_REACT")
if(gett === false) return await reply(alredy)
await input("AUTO_REACT", false)
await reply("*💁‍♂️ AUTO_REACT ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})




cmd({
    pattern: "pv",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("PRIVATE")
if(gett === true) return await reply(alredy)
await input("PRIVATE", true)
await reply("*💁‍♂️ MODE ➨* private")
} else{
let gett = await get("PRIVATE")
if(gett === false) return await reply(alredy)
await input("PRIVATE", false)
await reply("*💁‍♂️ MODE ➨* public")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})















cmd({
    pattern: "anticall",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("ANTI_CALL")
if(gett === true) return await reply(alredy)
await input("ANTI_CALL", true)
await reply("*💁‍♂️ ANTI_CALL ➨* on")
} else{
let gett = await get("ANTI_CALL")
if(gett === false) return await reply(alredy)
await input("ANTI_CALL", false)
await reply("*💁‍♂️ ANTI_CALL ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})






cmd({
    pattern: "autoblock",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("AUTO_BLOCK")
if(gett === true) return await reply(alredy)
await input("AUTO_BLOCK", true)
await reply("*💁‍♂️ AUTO_BLOCK ➨* on")
} else{
let gett = await get("AUTO_BLOCK")
if(gett === false) return await reply(alredy)
await input("AUTO_BLOCK", false)
await reply("*💁‍♂️ AUTO_BLOCK ➨* off")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})








cmd({
    pattern: "lang",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
let gett = await get("LANG")
if(gett === q) return await reply(alredy)
await input("LANG", q)

await reply("*Language updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "uploadsz",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)
let gett = await get("MAX_SIZE")
if(gett === Number(q)) return await reply(alredy)
await input("MAX_SIZE", Number(q))

await reply("*Max upload size updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "alivemg",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
let gett = await get("ALIVE")
if(gett === q) return await reply(alredy)
await input("ALIVE", q)

await reply("*Alive massage updated:* " + q )

} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "active",
   category: "movie",
    desc: "Active to jid",
    
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, isSudo, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
let gett = await get("JID")
if(gett === q) return await reply(alredy)
await input("JID", q)

await reply("*Activeted:* " + q)

} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "setowner",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isSudo, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
let gett = await get("OWNER_NUMBER")
if(gett === q) return await reply(alredy)
await input("OWNER_NUMBER", q)

await reply("*OWNER_NUMBER:* " + q)

} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "setsudo",
    react: "👨🏻‍🔧",
    alias: ["set","addsudo"],
    desc: "Set moderator.",
    category: "owner",
    use: '.setsudo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, msr, creator, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, isDev, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (!isMe) return await reply('*OWNER COMMAND ⛔*') 
 
const sudo_id = m.mentionUser[0]
    if(!sudo_id) return 
 
const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === sudo_id) return true
}
return false
}


 
if(await isAnti("SUDO")) return
let olddata = await get("SUDO")
olddata.push(sudo_id)
await input("SUDO", olddata)
await reply("*Successful added Moderater list ✅*")
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })
  
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})




cmd({
    pattern: "setlogo",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, isSudo, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
let gett = await get("LOGO")
if(gett === q) return await reply(alredy)
await input("LOGO", q)

await reply("*Logo updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
l(e)
}
})

var needus =''
if(config.LANG === 'SI') needus = 'එය දත්ත සමුදාය නැවත සකසයි.'
else needus = "It resets database." 
cmd({
    pattern: "resetdb",
    desc: needus,
    category: "owner",
    use: '.resetdb',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, isSudo, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isMe) return await reply(BOTOW)
   await updfb()
return reply("*Database reseted ✅*")
} catch (e) {
reply(cantf)
l(e)
}
})


cmd({
    pattern: "autotyping",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isSudo,  isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("AUTO_TYPING")
if(gett === true) return await reply(alredy)
await input("AUTO_TYPING", true)
await reply("*AUTO_TYPING updated: " + q + "*")
} else{
let gett = await get("AUTO_TYPING")
if(gett === false) return await reply(alredy)
await input("AUTO_TYPING", false)
await reply("*AUTO_TYPING updated: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})

cmd({
    pattern: "autorec",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, isSudo, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("AUTO_RECORDING")
if(gett === true) return await reply(alredy)
await input("AUTO_RECORDING", true)
await reply("*AUTO_RECORDING updated: " + q + "*")
} else{
let gett = await get("AUTO_RECORDING")
if(gett === false) return await reply(alredy)
await input("AUTO_RECORDING", false)
await reply("*AUTO_RECORDING updated: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})



cmd({
    pattern: "autos",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, isSudo, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("AUTO_READ_STATUS")
if(gett === true) return await reply(alredy)
await input("AUTO_READ_STATUS", true)
await reply("*AUTO_READ_STATUS updated: " + q + "*")
} else{
let gett = await get("STATUS_VIEW")
if(gett === false) return await reply(alredy)
await input("AUTO_READ_STATUS", false)
await reply("*AUTO_READ_STATUS updated: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})

cmd({
    pattern: "setprefix",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, isSudo, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 
let gett = await get("PREFIX")
if(gett === q) return await reply(alredy)
await input("PREFIX", q)

await reply("*PREFIX updated:* " + q)

} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "autoread",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, isSudo, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("AUTO_MSG_READ")
if(gett === true) return await reply(alredy)
await input("AUTO_MSG_READ", true)
await reply("*AUTO_MSG_READ updated: " + q + "*")
} else{
let gett = await get("AUTO_MSG_READ")
if(gett === false) return await reply(alredy)
await input("AUTO_MSG_READ", false)
await reply("*AUTO_MSG_READ updated: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})
cmd({
    pattern: "ronly",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, isSudo,  command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe && !isSudo) return await reply('*OWNER COMMAND ⛔*') 

const isAnti = async(teks) => {
let getdata = await get(teks)
for (let i=0;i<getdata.length;i++) {
if(getdata[i] === from) return true
}
return false
}


if(q === "on"){
let gett = await get("CMD_ONLY_READ")
if(gett === true) return await reply(alredy)
await input("CMD_ONLY_READ", true)
await reply("*CMD_ONLY_READ updated: " + q + "*")
} else{
let gett = await get("CMD_ONLY_READ")
if(gett === false) return await reply(alredy)
await input("CMD_ONLY_READ", false)
await reply("*CMD_ONLY_READ updated: " + q + "*")
}
} catch (e) {
reply('*Error !!*')
l(e)
}

})
