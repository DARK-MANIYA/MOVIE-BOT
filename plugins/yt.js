const config = require('../config')

const fs = require('fs')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    getsize,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')
const {
    cmd,
    commands
} = require('../command')
var sizetoo =  "_This file size is too big_"
const yts = require("ytsearch-venom")

let wm = config.FOOTER
let newsize = config.MAX_SIZE * 1024 * 1024

function ytreg(url) {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    return ytIdRegex.test(url);
}
cmd({
    pattern: "y",
    alias: ["yts"],
    use: '.yts lelena',
    react: "🔎",
desc: "Search songs",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
if(isUrl(q) && !ytreg(q)) return await reply(imgmsg)
try {
let yts = require("ytsearch-venom")
var arama = await yts(q);
} catch(e) {
    l(e)
return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
}
var mesaj = '';
arama.all.map((video) => {
mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
});
await conn.sendMessage(from , { text:  mesaj }, { quoted: mek } )
} catch (e) {
    l(e)
  reply('*Error !!*')
}
})
cmd({
    pattern: "song",
    alias: ["ytsong"],
    use: '.song lelena',
    react: "🎧",
      desc: "Download songs",
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{            
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*🎧 HYPER SONG DOWNLODER 🎧*

*\`📃 Title:\`* ${result.title}

*\`📺 Views:\`* ${result.views}

*\`🕹️ Duration:\`* ${result.duration}

*\`🔗 Url:\`* ${result.url}`
const buttons = [
  {buttonId: prefix + 'ytaa ' + result.url, buttonText: {displayText: 'AUDIO TYPE'}, type: 1},
{buttonId: `${prefix}ytad ${result.url}±${result.title}`, buttonText: {displayText: 'DOCUMENT TYPE'}, type: 1}
	]
const buttonMessage = {
    image: {url: result.thumbnail},
    caption: caption,
    footer: wm,
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
    pattern: "ytaa",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')
           const prog = await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${q}`)

	
	const mn  = `${prog.data.download}`
	
           await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio:{ url: mn }, mimetype: 'audio/mpeg' }, { quoted: mek })
	 await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
	
         } catch (e) {
	       console.log(e)
        }
    })
    
    
    cmd({
    pattern: "ytad",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')
	
	 const dataa = q.split("±")[0]
        const datas = q.split("±")[1]
         
             const prog = await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${dataa}`)
		const mn  = `${prog.data.download}`
	 await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
         await conn.sendMessage(from, { document:{ url: mn }, mimetype: 'audio/mpeg' , caption: config.FOOTER, fileName: `${datas}.mp3` }, { quoted: mek });
   await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
	 await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
	       console.log(e)
        }
    })

cmd({
    pattern: "video",
    alias: ["ytvideo"],
    use: '.song lelena',
    react: "📽️",
      desc: "Download videos",
    category: "download",
    filename: __filename
},

async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{            
    if (!q) return await reply('*Please enter a query or a url!*')
    const url = q.replace(/\?si=[^&]*/, '');
    var results = await yts(url);
    let wm = config.FOOTER
    var result = results.videos[0]
     let caption = `*📽️ HYPER VIDEO DOWNLODER 📽️*
     
*📃 Title:* ${result.title}

*📺 Views:* ${result.views}

*🕹️ Duration:* ${result.duration}

*🔗 Url:* ${result.url}`
const buttons = [
  {buttonId: `${prefix}360pv ${result.url}` , buttonText: {displayText: 'VIDEO TYPE'}, type: 1},
{buttonId: `${prefix}720pv ${result.url}±${result.title}`, buttonText: {displayText: 'DOCUMENT TYPE'}, type: 1}
	]
 const buttonMessage = {
    image: {url: result.thumbnail},
    caption: caption,
    footer: wm,
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
    pattern: "360pv",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')
	
         
           const prog = await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp4?url=${q}`)
           await conn.sendMessage(from, { video: {url: prog.result.dl_link },caption: config.FOOTER}, { quoted: mek })  
	 await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
         } catch (e) {
	       console.log(e)
        }
    })

cmd({
    pattern: "480pv",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')
	
         
           const prog = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp4?url=${q}`)
           await conn.sendMessage(from, { video: {url: prog.result.download_url },caption: config.FOOTER}, { quoted: mek })  
         } catch (e) {
	       console.log(e)
        }
    })
cmd({
    pattern: "720pv",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')

	 const data = q.split("±")[0]
        const datas = q.split("±")[1]
	
         
           const prog = await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp4?url=${data}`)
          await conn.sendMessage(from, { document:{ url: prog.result.dl_link  }, mimetype: 'audio/mpeg' , caption: config.FOOTER, fileName: `${datas}.mp4` }, { quoted: mek });      } catch (e) {
	        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
	console.log(e)
        }
    })
cmd({
    pattern: "1080pv",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
try {
           if (!q) return await reply('*Need a youtube url!*')
	
         
           const prog = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp4?url=${q}`)
           await conn.sendMessage(from, { video: {url: prog.result.download_url },caption: config.FOOTER}, { quoted: mek })  
         } catch (e) {
	       console.log(e)
        }
    })
