const axios = require('axios');
const mime = require('mime-types');  // Make sure to install mime-types package
const cheerio = require('cheerio');
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { File } = require('megajs');
const config = require('../config')
const sizeOf = require("image-size")

const {
  cmd,
  commands
} = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')




cmd({
    pattern: "finfo",
    use: '.movi <query>',
    react: "🎥",
    desc: "Download movies",
    //category: "download",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, prefix, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return await reply('*please give me text !..*')


let sadas = await fetchJson(`https://darksadas-yt-fire-info.vercel.app/scrape?url=${q}`)


	let msg = `*☘️ Tιтle ➜* *${sadas.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.dates}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.durations}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.ratings}_
`



if (sadas.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )


 var rows = [];  

rows.push({
      buttonId: prefix + 'fdetails ' + q, buttonText: {displayText: 'Details send'}, type: 1}

	  
	  
);
	
  sadas.downloadLinks.map((v) => {
	rows.push({
        buttonId: prefix + `fdl ${sadas.images}±${v.link}±${sadas.title}
	
	*\`${v.quality}\`*`,
        buttonText: { displayText: `${v.size} - ${v.quality}` },
        type: 1
          }
		 
		  //{buttonId: prefix + 'cdetails ' + q, buttonText: {displayText: 'Details send'}, type: 1}
		 
		 
		 );
        })



  
const buttonMessage = {
 
image: {url: sadas.images },	
  caption: msg,
  footer: config.FOOTER,
  buttons: rows,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})
   
    cmd({
    pattern: "fdl",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {

	 await conn.sendMessage(from, { text : `*Downloading your movie..⬇️*` }, {quoted: mek} )    
  const datae = q.split("±")[0]
const datas = q.split("±")[1]
const dat = q.split("±")[2]	    



	   

let sadas = await fetchJson(`https://darksadas-yt-fire-last-dl.vercel.app/scrape?url=${datas}`)
	    const mh = `${sadas.downloadLinks}`
	    
        const mediaUrl = mh.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: `*🎬 Name :* ${dat}


> _*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ*_`,
            mimetype: "video/mp4",
	
            fileName: `${dat}.mp4`,
        };
await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
	     await conn.sendMessage(from, { text : `*Uploading your movie..⬆️*` }, {quoted: mek} )
        await conn.sendMessage(config.JID, message);

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
	    await conn.sendMessage(from, { text : `*Movie send Successfull this JID ${config.JID} ✔*` }, {quoted: mek} )
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});
  cmd({
    pattern: "fdetails",	
    react: '🎥',
    //category: "search",
    desc: "moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')






	let sadas = await fetchJson(`https://darksadas-yt-fire-info.vercel.app/scrape?url=${q}`)


	let msg = `*☘️ Tιтle ➜* *${sadas.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.dates}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.durations}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.ratings}_


*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*

> *ＨＹＰＥＲ- ＤＬ*
`
await conn.sendMessage(config.JID, { image: { url: sadas.images }, caption: msg })



 await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});
