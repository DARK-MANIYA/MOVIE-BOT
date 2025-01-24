const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const gis = require('async-g-i-s');
const {unsplash, pixabay} = require("@sl-code-lords/image-library")
const axios = require('axios');
const { Buffer } = require('buffer');
const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID


var imgmsg =''
if(config.LANG === 'SI') imgmsg = "```කරුණාකර වචන කිහිපයක් ලියන්න!```"
else imgmsg = "```Please write a few words!```"

var desc =''
if(config.LANG === 'SI') desc = "ගූගල් හි අදාළ පින්තූර සෙවීම."
else desc = "Search for related pics on Google."

var desc2 =''
if(config.LANG === 'SI') desc2 = "unsplash.com හි අදාළ පින්තූර සෙවීම."
else desc2 = "Search for related pics on unsplash.com."

var desc3 =''
if(config.LANG === 'SI') desc3 = "pixabay.com හි අදාළ පින්තූර සෙවීම."
else desc3 = "Search for related pics on pixabay.com."

var desc4 =''
if(config.LANG === 'SI') desc4 = "bing හි අදාළ පින්තූර සෙවීම."
else desc4 = "Searche for related pics on bing."

var errt =''
if(config.LANG === 'SI') errt = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else errt = "*I couldn't find anything :(*"














cmd({
    pattern: "img",
    react: '🖼️',
    alias: ["unsplash"],
    desc: desc2,
    category: "download",
    use: '.img2 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await unsplash.search({"query": q, page: 1})
let data = results
if (data.result.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.result.length; i++) {
srh.push({
title: 'Image number: ' + nombor++ ,
rowId: prefix + 'dimg ' + data.result[i]
});
}
const sections = [{
title: "Result from unsplash.com. 📲",
rows: srh
}]
const listMessage = { 
text: `*🖼️ HYPER IMAGE DOWNLODER  🖼️*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from unsplash.com. 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "img2",
    react: '🖼️',
    alias: ["pixabay"],
    desc: desc3,
    category: "download",
    use: '.img3 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await pixabay.search({"query": q, page: 1})
let data = results
if (data.result.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.result.length; i++) {
srh.push({
title: 'Image number: ' + nombor++ ,
rowId: prefix + 'dimg ' + data.result[i]
});
}
const sections = [{
title: "Result from pixabay.com. 📲",
rows: srh
}]
const listMessage = { 
text: `*🖼️ HYPER IMAGE DOWNLODER  🖼️*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from pixabay.com. 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "img3",
    react: '🖼️',
    alias: ["bingimage","bingimg"],
    desc: desc4,
    category: "download",
    use: '.img4 car',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(imgmsg)
const results = await fetchJson('https://api.akuari.my.id/search/bingimage?query=' + q)
let data = results.hasil
if (data.results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
let nombor = 1
for (var i = 0; i < data.results.length; i++) {
srh.push({
title: data.results[i].title ,
description: data.results[i].description ,
rowId: prefix + 'dimg ' + data.results[i].direct
});
}
const sections = [{
title: "Result from bing 📲",
rows: srh
}]
const listMessage = { 
text: `*🖼️ HYPER IMAGE DOWNLODER  🖼️*

*🖼️ Image Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from bing 📲',
buttonText: 'Select Image',
sections
}
await conn.listMessage(from, listMessage, mek)

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "dimg",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🔃', key: mek.key }})
    await conn.sendMessage(from, { image: { url: q }, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})
