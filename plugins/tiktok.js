const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')


const oce = "`"

cmd({
    pattern: "tiktok",    
  alias: ["tt","ttdl","tiktokdl"],
    react: '🎩',
    desc: "Download tiktok videos",
    category: "download",
    use: '.tiktok < tiktok url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
  
  if (!q) return await reply('TEXT') 
      if (!q.includes('tiktok')) return await reply('valid_url') 


const mov = await fetchJson(`https://api.fgmods.xyz/api/downloader/tiktok?url=${q}&apikey=mnp3grlZ`)

let yt = `*🎩 HYPER TIK TOK DOWNLODER 🎩*

*🍀 Tɪᴛʟᴇ :* ${mov.result.title}

*🧑‍🎄 Rᴇɢɪᴏɴ :* ${mov.result.region}

*⏱️Dᴜʀᴀᴛɪᴏɴ :* ${mov.result.duration}
`



const buttons = [
  {buttonId: prefix + 'ttdl1 ' + mov.result.wmplay, buttonText: {displayText: 'DOWNLOAD VIDEO NO WATERMARK'}, type: 1},
  {buttonId: prefix + 'ttdl2 ' + mov.result.wmplay, buttonText: {displayText: 'DOWNLOAD VIDEO WATERMARK'}, type: 1},
  {buttonId: prefix + 'ttdl3 ' + mov.result.wmplay, buttonText: {displayText: 'DOWNLOAD VIDEO AUDIO'}, type: 1},
  {buttonId: prefix + 'ttdl4 ' + mov.result.wmplay, buttonText: {displayText: 'DOWNLOAD ORIGINAL AUDIO'}, type: 1}
]
const buttonMessage = {
    image: {url: mov.result.cover},
    caption: yt,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply(N_FOUND)
  console.log(e)
}
})


cmd({
    pattern: "ttdl1",
    react: '⬆',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
  if (!q) return await reply(msr.url) 
	
conn.sendMessage(from, { video: { url: q }, mimetype: "video/mp4", caption: `NO-WATERMARK ✔️\n\n${config.FOOTER}` }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } })
} catch (e) {
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "ttdl2",
    react: '⬆',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
  if (!q) return await reply(msr.url) 
	
conn.sendMessage(from, { video: { url: q }, mimetype: "video/mp4", caption: `WATERMARK ✔️\n\n${config.FOOTER}` }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } })
} catch (e) {
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "ttdl3",
    react: '⬆',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
  if (!q) return await reply(msr.url) 
	
conn.sendMessage(from, { audio: { url: q }, mimetype: "audio/mpeg", caption: `AUDIO ✔️\n\n${config.FOOTER}` }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } })
} catch (e) {
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})


cmd({
    pattern: "ttdl4",
    react: '⬆',
    dontAddCommandList: true,
    filename: __filename
},
  
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DarkYasiyaofc/FROZEN-HARD/main/MESSAGES/mreply.json')).replyMsg
  if (!q) return await reply(msr.url) 
	
conn.sendMessage(from, { audio: { url: q }, mimetype: "audio/mpeg", caption: `AUDIO ✔️\n\n${config.FOOTER}` }, { quoted: mek })
  await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key } })
} catch (e) {
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

  
