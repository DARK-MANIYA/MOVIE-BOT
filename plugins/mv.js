const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios');
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { Buffer } = require('buffer'); 
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const fileType = require("file-type")
const l = console.log

cmd({
    pattern: "movie",	
    react: '🔎',
    category: "movie",
	 alias: ["mv"],
    desc: "Moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{
 if(!q) return await reply('*please give me text !..*')
let url = await fetchJson(`https://darksadas-yt-cinezub-search.vercel.app/?query=${q}`)
let urll = await fetchJson(`https://darksadas-yt-sinhalasub-search.vercel.app/?q=${q}`)	
let urlll = await fetchJson(`https://f-api-alpha.vercel.app/search?q=${q}`)
let urllll = await fetchJson(`https://darksadas-yt-baiscope-search.vercel.app/?query=${q}`)
   
if (url.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < url.data.length; i++) {
srh.push({
title: url.data[i].title.replace("Sinhala Subtitles | සිංහල උපසිරැසි සමඟ", "").replace("Sinhala Subtitle | සිංහල උපසිරැසි සමඟ", ""),
description: '',
rowId: prefix + 'cinedl ' + url.data[i].link
});
}
if (urll.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srhh = [];  
for (var i = 0; i < urll.data.length; i++) {
srhh.push({
title: urll.data[i].Title.replace("Sinhala Subtitles | සිංහල උපසිරසි සමඟ", ""),
description: '',
rowId: prefix + 'sininfo ' + urll.data[i].Link
});
}
if (urlll.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srhhh = [];  
for (var i = 0; i < urlll.data.length; i++) {
srhhh.push({
title: urlll.data[i].title.replace("සිංහල උපසිරැසි සමඟ", ""),
description: '',
rowId: prefix + 'finfo ' + urlll.data[i].link
});
}
if (urllll.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srhhhh = [];  
for (var i = 0; i < urllll.length; i++) {
srhhhh.push({
title: urllll[i].title.replace("සිංහල උපසිරැසි සමඟ", ""),
description: '',
rowId: prefix + 'finfo ' + urllll[i].link
});
}

	
const sections = [{
title: "cinesubz.co results 🎬",
rows: srh
},
{
title: "sinhalasub.lk results 🎬",
rows: srhh
},
{
title: "firemovieshub.com results 🎬",
rows: srhhh
},
{
title: "baiscopes.lk results 🎬",
rows: srhhhh
}		  
		 ]
const listMessage = {
text: `𝗛𝗬𝗣𝗘𝗥 𝗗𝗟 𝗠𝗢𝗩𝗜𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 𝗦𝗬𝗦𝗧𝗘𝗠 🔎

*Movie Search : ${q} 🔎*

`,
footer: config.FOOTER,
title: 'cinesubz.co results 🎬',
buttonText: '*\`Reply Below Number 🔢\`*\n',
sections
}
await conn.listMessage(from, listMessage,mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})


cmd({
    pattern: "cine",	
    react: '🔎',
    category: "movie",
	 alias: ["cinesub"],
    desc: "Moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{
 if(!q) return await reply('*please give me text !..*')
let url = await fetchJson(`https://darksadas-yt-cinezub-search.vercel.app/?query=${q}`)

if (url.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < url.data.length; i++) {
srh.push({
title: url.data[i].title,
description: '',
rowId: prefix + 'cinedl ' + url.data[i].link
});
}

const sections = [{
title: "_[cinesubz.co results 🎬]_",
rows: srh
}	  
]
const listMessage = {
text: `*🎬 DARK SHUTER MOVIE DL 🎬*

*Movie Search : ${q} 🔎*`,
footer: config.FOOTER,
title: '_[cinesubz.co results 🎬]_',
buttonText: '*\`Reply Below Number 🔢\`*\n',
sections
}
await conn.listMessage(from, listMessage,mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})




cmd({
    pattern: "cinedl",	
    react: '🎥',
    //category: "search",
    desc: "moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isMe, prefix, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')


let sadas = await fetchJson(`https://cinesub-info.vercel.app/?url=${q}&apikey=dinithimegana`)


	let msg = `*☘️ Tιтle ➜* *${sadas.data.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.data.date}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.data.imdb}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.data.runtime}_
*🌎 Cᴏᴜɴᴛʀʏ ➜* _${sadas.data.country}_
*💁‍♂️ Dɪʀᴇᴄᴛᴏʀ ➜* _${sadas.data.subtitle_author}_
`



if (sadas.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )


 var rows = [];  

rows.push({
      buttonId: prefix + 'cdetails ' + q, buttonText: {displayText: 'Details send'}, type: 1}

	  
	  
);
	
  sadas.dl_links.map((v) => {
	rows.push({
        buttonId: prefix + `cdl ${sadas.data.image}±${v.link}±${sadas.data.title}
	
	*\`${v.quality}\`*`,
        buttonText: { displayText: `${v.size} - ${v.quality}` },
        type: 1
          }
		 
		  //{buttonId: prefix + 'cdetails ' + q, buttonText: {displayText: 'Details send'}, type: 1}
		 
		 
		 );
        })



  
const buttonMessage = {
 
image: {url: sadas.data.image.replace("fit=", "")},	
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
    pattern: "cdl",
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
	    

let sadas = await fetchJson(`https://darksadas-yt-firemovies-dl.vercel.app/?url=${datas}&apikey=dinithimegana`)
	    const mh = `${sadas.data.directLink}`
	    
        const mediaUrl = mh.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');

const botimg = `${datae}`


        const message = {
            document: mediaBuffer,
	    caption: `*🎬 Name :* ${dat}


> _*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ*_`,
            mimetype: "video/mp4",
	jpegThumbnail: await (await fetch(botimg)).buffer(),
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
    pattern: "cdetails",	
    react: '🎥',
    //category: "search",
    desc: "moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')


let sadas = await fetchJson(`https://cinesub-info.vercel.app/?url=${q}&apikey=dinithimegana`)



	let msg = `*☘️ Tιтle ➜* *${sadas.data.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.data.date}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.data.imdb}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.data.runtime}_
*🌎 Cᴏᴜɴᴛʀʏ ➜* _${sadas.data.country}_
*💁‍♂️ Dɪʀᴇᴄᴛᴏʀ ➜* _${sadas.data.subtitle_author}_

*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*

> *ＨＹＰＥＲ- ＤＬ*
`
await conn.sendMessage(config.JID, { image: { url: sadas.data.image.replace("fit=", "") }, caption: msg })



 await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

cmd({
    pattern: "forward",
    react: "",
alias: ["f"],
    desc: "forward msgs",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isIsuru, isTharu, isOwner, isSupporters, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {


if (!q || !m.quoted) {
return reply("*Please give me a Jid and Quote a Message to continue.*");
}
  // Split and trim JIDs
  let jidList = q.split(',').map(jid => jid.trim());
  if (jidList.length === 0) {
    return reply("*Provide at least one Valid Jid. ⁉️*");
  }
  // Prepare the message to forward
  let Opts = {
    key: mek.quoted?.["fakeObj"]?.["key"]
  };
  // Handle document message
  if (mek.quoted.documentWithCaptionMessage?.message?.documentMessage) {
    let docMessage = mek.quoted.documentWithCaptionMessage.message.documentMessage;
    const mimeTypes = require("mime-types");
    let ext = mimeTypes.extension(docMessage.mimetype) || "file";
    docMessage.fileName = docMessage.fileName || `file.${ext}`;
  }
  
  Opts.message = mek.quoted;
  let successfulJIDs = [];
  // Forward the message to each JID
  for (let i of jidList) {
try {
await conn.forwardMessage(i, Opts, false);
successfulJIDs.push(i);
} catch (error) {
console.log(e);
}
}
  // Response based on successful forwards
if (successfulJIDs.length > 0) {
return reply(`*Message Forwarded*\n\n` + successfulJIDs.join("\n"))
} else {
console.log(e)
}
});















cmd({
    pattern: "forward2",
    desc: "forward msgs",
    alias: ["fo"],
    category: "owner",
    use: '.forward2 < Jid address 1, Jid address 2, ...>',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    if (!isOwner) {
        return reply("*Owner Only ❌*");
    }
    
    if (!q || !m.quoted) {
        return reply("*Provide the message and JID(s) ❌*");
    }

    let jids = q.split(',').map(jid => jid.trim()); // JIDs list from input
    if (jids.length === 0) {
        return reply("*Provide at least one valid JID ❌*");
    }

    let message = {};
    message.key = mek.quoted?.fakeObj?.key;

    if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
        let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype;
        const mimeType = require('mime-types');
        let ext = mimeType.extension(mime);		    
        mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = mek.quoted.documentWithCaptionMessage.message.documentMessage.caption + "." + ext;
    }

    message.message = mek.quoted;

    let successJIDs = [];
    for (let jid of jids) {
        try {
            await conn.forwardMessage(jid, message, false);
            successJIDs.push(jid);
        } catch (error) {
            console.log(`Failed to forward to ${jid}:`, error);
        }
    }

    if (successJIDs.length > 0) {
        return reply(`*Message successfully forwarded to:*\n\n${successJIDs.join("\n")}`);
    } else {
        return reply("*Failed to forward to all provided JIDs ❌*");
    }
});	

async function GDriveDl(url) {
    let id, res = { "error": true }
    if (!(url && url.match(/drive\.google/i))) return res

    const formatSize = sizeFormatter({
        std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
    })

    try {
        id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
        if (!id) throw 'ID Not Found'
        res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'post',
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                'content-length': 0,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'origin': 'https://drive.google.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                'x-drive-first-party': 'DriveWebUi',
                'x-json-requested': 'true'
            }
        })
        let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
        if (!downloadUrl) throw 'Link Download Limit!'
        let data = await fetch(downloadUrl)
        if (data.status !== 200) return data.statusText
        return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
    } catch (e) {
        console.log(e)
        return res
    }
}


cmd({
    pattern: "gdrive",
    alias: ["googledrive'"],
    react: '⬇️',
    desc: "Download googledrive files.",
    category: "download",
    use: '.gdrive <googledrive link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return await  reply('*Please give me googledrive url !!*')   
let res = await GDriveDl(q)
		let txt = `*[ Downloading file ]*\n\n`
		txt += `*Name :* ${res.fileName}\n`
		txt += `*Size :* ${res.fileSize}\n`
		txt += `*Type :* ${res.mimetype}`	
        await reply(txt)
 await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
	conn.sendMessage(from, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })
 await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
} catch (e) {
reply('*Error !!*')
console.log(e)
//reply(${e})
}
})





cmd({
    pattern: "sininfo",
    alias: ["mdv"],
    use: '.moviedl <url>',
    react: "🎥",
    desc: "download movies from sinhalasub.lk",
    //category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, prefix, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('🚩 *Please give me a url*')

let sadas = await fetchJson(`https://darksadas-yt-sinhalasub-info-dl.vercel.app/?url=${q}`)

	

if (sadas.length < 1) return await conn.sendMessage(from, { text: "🚩 *I couldn't find anything :(*" }, { quoted: mek } )

 var rows = [];  	
	
	rows.push({
      buttonId: prefix + 'daqt ' + q, buttonText: {displayText: 'Details send'}, type: 1}

	  
	  
);
  
  sadas.downloadLinks.map((v) => {
	rows.push({
        buttonId: prefix + `sindl ${v.link}±${sadas.images[1]}±${sadas.title}
	
	*\`${v.quality}\`*`,
        buttonText: { displayText: `${v.size} - ${v.quality}` },
        type: 1
          },
		 
	//{buttonId: prefix + 'detailss ' + q, buttonText: {displayText: 'Details send'}, type: 1}	 
		 
		 
		 
		 
		 );
        })
 const msg = `   *🎥HYPER MOVIE DOWNLODER🎥*
 
*☘️ Tιтle   : ${sadas.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.date}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.rating}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.duration}_
*🎭 Dɪʀᴇᴄᴛᴏʀ ➜* _${sadas.author}_
*🌎 Cᴏᴜɴᴛʀʏ ➜* _${sadas.country}_ 
`
const buttonMessage = {
 
image: {url: sadas.images[0] || images},	
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
    pattern: "mn",
    react: "🎥",
    alias: ["online", "test", "bot"],
    desc: "Check bot online or no.",
    //category: "other",
    use: '.alive',
    filename: __filename
},
async (conn, mek, m, {
    from,
    prefix,
    q,
    pushname,
    reply
}) => {
    try {

        if(!q) return await reply('please give me text !..')


const datae = q.split("±")[0]
const datas = q.split("±")[1]

      let sadas = await fetchJson(`https://darksadas-yt-sinhalasub-dl.vercel.app/?url=${datae}`)    
  
	    const da = sadas.downloadLink.split("https://pixeldrain.com/u/")[1]
const fhd = `https://pixeldrain.com/api/file/${da}`

let mfg = `*DOWNLOAD MOVIE*
`
 const buttons = [
        {buttonId:`${prefix}fit ${fhd}±${datas}` , buttonText: {displayText: `Download Now`}, type: 1}
        
      ]
        const buttonMessage = {
		image: {url: 'https://telegra.ph/file/091fc81528af5881cdf47.jpg'},	
            caption: mfg,
            footer: config.FOOTER,
            buttons: buttons,
            headerType: 1
        }
       await conn.buttonMessage(from, buttonMessage, mek)
       } catch (e) {
            console.log(e)
            reply('*Error !!*')
        }
    })

















cmd({
    pattern: "sindl",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {

    try {
	  const pix = q.split("±")[0]
        const imglink = q.split("±")[1]
const title = q.split("±")[2]
	// if (!pix || !pix.includes('pixeldrain.com')) return await reply('*This dl link can not fetch but not pixaldrain❌*');
   await conn.sendMessage(from, { text : `*Pixaldrain replacing started..🔁*` }, {quoted: mek} )
let sadas = await fetchJson(`https://darksadas-yt-sinhalasub-dl.vercel.app/?url=${pix}`)  
    const da = sadas.downloadLink.split("https://pixeldrain.com/u/")[1]
const fhd = `https://pixeldrain.com/api/file/${da}`

 await conn.sendMessage(from, { text : `*Pixaldrain replaced🟢*` }, {quoted: mek} )
		
	     await conn.sendMessage(from, { text : `*Downloading your movie..⬇️*` }, {quoted: mek} )


        const mediaUrl = fhd.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');


const botimg = `${imglink}`

        const message = {
            document: mediaBuffer,
	    caption: `*🎬 Name :* ${title}
     
> _*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ*_`,
            mimetype: "video/mp4",
	jpegThumbnail: await (await fetch(botimg)).buffer(),
            fileName: `${title}🎬HYPER MOVIE DL🎬.mp4`,
        };
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
    pattern: "fetch",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {

    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
    
        
//const dat = q.split("https://disk.firemovieshub.com/Disk3/FIREMOVIESHUB/")[1]
//const fhd = `${dat}`

        const mediaUrl = q.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: "*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ🎥*",
            mimetype: "video/mp4",
            fileName: `sadas.mp4`,
        };

        await conn.sendMessage(config.JID, message);

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});



cmd({
    pattern: "daqt",
    alias: ["mdv"],
    use: '.moviedl <url>',
    react: "🎥",
    desc: "download movies from sinhalasub.lk",
    //category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, prefix, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('🚩 *Please give me a url*')

let sadas = await fetchJson(`https://darksadas-yt-sinhalasub-info-dl.vercel.app/?url=${q}`)
	



 const msg = `   *🎥 DARK SHUTER MOVIE DOWNLODER 🎥*
 
*☘️ Tιтle   : ${sadas.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.date}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.rating}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.duration}_
*🎭 Dɪʀᴇᴄᴛᴏʀ ➜* _${sadas.author}_
*🌎 Cᴏᴜɴᴛʀʏ ➜* _${sadas.country}_ 

*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*
`
await conn.sendMessage(config.JID, { image: { url: sadas.images[0] || images }, caption: msg })



 await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});
  

cmd({
    pattern: "tv",
    alias: ["t","tvs"],
    use: '.movie <query>',
    react: "🔎",
    desc: "Download movies",
    category: "movie",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const movie = await sinhalaSub()

if (!q) return reply('🚩 *Please give me words to search*')
var res = await movie.search(q)

const msg = `乂 *S I N H A L A S U B - S E A R C H*`
const data = res.result
if (data.length < 1) return await conn.sendMessage(from, { text: "🚩 *I couldn't find anything :(*" }, { quoted: mek } )

  var rows = [];  
  res.result.map((v) => {
	rows.push({
        buttonId: `.tvb ${v.link}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })

const buttonMessage = {
 
image: {url: 'https://telegra.ph/file/091fc81528af5881cdf47.jpg'},	
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
    pattern: "tvb",
    alias: ["tvshows"],
    use: '.tv <url>',
    react: "🎥",
    desc: "download movies from sinhalasub.lk",
    //category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, prefix, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('🚩 *Please give me a url*')

    const response = await fetch(q); // Replace with the actual URL if needed
    const body = await response.text();

    const $ = cheerio.load(body);
      
      const results = [];

      $('.episodiotitle').each((index, element) => {
      results.push({
          title: $(element).find('a').text(),
          link : $(element).find('a').attr('href')


              
	      
          
      })
      });

console.log(results)
     if (results.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var rows = [];  
      var rows = [];  
  results.map((v) => {
	rows.push({
        buttonId: `${prefix}fdl ${v.link}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })
    
const buttonMessage = {
  image: {url: 'https://telegra.ph/file/091fc81528af5881cdf47.jpg'},
  caption: `*🎥 TV SHOWS DOWNLOADER 🎥*`,
  footer: config.FOOTER,
  buttons: rows,
  headerType: 4
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "detailss",
    alias: ["dltestss"],
    use: '.moviedl <url>',
    react: "🎥",
    desc: "download movies from sinhalasub.lk",
    //category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('🚩 *Please give me a url*')
                                const response = await axios.get(q);

		    const $ = cheerio.load(response.data);

		    const newsArticle = $(".sheader").first();

                    const newsHeadline = newsArticle.find(".data .head h1").text();

                    const newsDate = newsArticle.find(".extra .tagline").text().trim();

                    const newsTime = newsArticle.find(".poster img").attr("src");

                    const date = newsArticle.find(".extra .date").text().trim();

                    const duration = newsArticle.find(".extra .runtime").text().trim();

                    const infoMovie = $("#info").first();

                    const desc = infoMovie.find(".wp-content p").text().trim();

                    const rat = infoMovie.find("#repimdb strong").text().trim();

                    const img = infoMovie.find("#dt_galery .owl-item a").attr("src");

	const msg = `*⦁⦂⦁━┉┉┉┉┉━━┉━━━┉━⦁⦂⦁*

*☘️ Title :* *${newsHeadline}*

*🖇️ Link :* *${q}*

*📅 Release :* *${date}*

*🕰️ Duration :* *${duration}*

*🏆 IMDD Rating :* *${rat}*
`
 await conn.sendMessage(config.JID, { text: msg })



 await conn.sendMessage(config.JID, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

	cmd({
    pattern: "edit",
    desc: "edit files",
    alias: ["ed"],
    category: "movie",
    use: '.edit hi & hi',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {


	
if (!q || !m.quoted) {
reply("*give me message ❌*")
}

  const data = q.split("&")[0]
        const datas = q.split("&")[1]

let p;
let message = {}

            message.key = mek.quoted?.fakeObj?.key;

            if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
            
		let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype

const mimeType = require('mime-types');
let ext = mimeType.extension(mime);		    

                mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = datas + "." + ext
		    mek.quoted.documentWithCaptionMessage.message.documentMessage.caption = data
  }
            message.message = mek.quoted;
const mass =  await conn.forwardMessage(from, message, false)
return reply(`*File edited ✅*`)
            
})



//================================================================================================

cmd({
    pattern: "cinetv",	
    react: '🔎',
    category: "movie",
	 alias: ["tv"],
    desc: "Moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{
 if(!q) return await reply('*please give me text !..*')
let url = await fetchJson(`https://darksadas-yt-cinezub-search.vercel.app/?query=${q}`)

if (url.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < url.data.length; i++) {
srh.push({
title: url.data[i].title,
description: '',
rowId: prefix + 'cinetvdl ' + url.data[i].link
});
}

const sections = [{
title: "_[cinesubz.co results 🎬]_",
rows: srh
}	  
]
const listMessage = {
text: `*🎬TV SHOWS DL 🎬*

*Movie Search : ${q} 🔎*`,
footer: config.FOOTER,
title: '_[cinesubz.co results 🎬]_',
buttonText: '*\`Reply Below Number 🔢\`*\n',
sections
}
await conn.listMessage(from, listMessage,mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})

cmd({
    pattern: "cinetvdl",	
    react: '🎥',
    //category: "search",
    desc: "moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isMe, prefix, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')


let sadas = await fetchJson(`https://darksadas-yt-cineszub-tv-shows.vercel.app/?url=${q}&apikey=pramashi`)


	let msg = `*☘️ Tιтle ➜* *${sadas.data.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.data.date}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.data.imdb}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.data.Lang}_
*🌎 Cᴏᴜɴᴛʀʏ ➜* _${sadas.data.country}_
*💁‍♂️ Dɪʀᴇᴄᴛᴏʀ ➜* _${sadas.data.subtitle_author}_
`



if (sadas.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )


 var rows = [];  

rows.push({
      buttonId: prefix + 'ctdetails ' + q, buttonText: {displayText: 'Details send'}, type: 1}

	  
	  
);
	
  sadas.data.episodes.map((v) => {
	rows.push({
        buttonId: prefix + `cinefirstdl ${sadas.data.image}±${v.episode_link}±${sadas.data.title} *\`${v.title}\`*`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          }
		 
		  //{buttonId: prefix + 'cdetails ' + q, buttonText: {displayText: 'Details send'}, type: 1}
		 
		 
		 );
        })



  
const buttonMessage = {
 
image: {url: sadas.data.image.replace("fit=", "")},	
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
    pattern: "cinefirstdl",	
    react: '🎬',
    category: "movie",
	 alias: ["tv"],
    desc: "Moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{
 if(!q) return await reply('*please give me text !..*')

const pix = q.split("±")[0]
        const imglink = q.split("±")[1]
const title = q.split("±")[2]
	
let url = await fetchJson(`https://darksadas-yt-cineszub-tv-shows-firstdl.vercel.app/?url=${imglink}&apikey=pramashi`)

if (url.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < url.data.length; i++) {
srh.push({
title: `${url.data[i].quality}  ${url.data[i].size}`,
description: '',
rowId: prefix + `dlc ${url.data[i].link}±${pix}±${title}
	
	*\`${url.data[i].quality}\`*`
});
}

const sections = [{
title: "_[Select quaility 🎬]_",
rows: srh
}	  
]
const listMessage = {
text: `*🎬Select quaility 🎬*`,
footer: config.FOOTER,
title: '_[cinesubz.co results 🎬]_',
buttonText: '*\`Reply Below Number 🔢\`*\n',
sections
}
await conn.listMessage(from, listMessage,mek)
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})




cmd({
    pattern: "dlc",
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
	    

let sadas = await fetchJson(`https://darksadas-yt-firemovies-dl.vercel.app/?url=${datae}&apikey=dinithimegana`)
	    const mh = `${sadas.data.directLink}`
	    
        const mediaUrl = mh.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');

const botimg = `${datas}`


        const message = {
            document: mediaBuffer,
	    caption: `*🎬 Name :* ${dat}


> _*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ*_`,
            mimetype: "video/mp4",
	jpegThumbnail: await (await fetch(botimg)).buffer(),
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
    pattern: "ctdetails",	
    react: '🎥',
    //category: "search",
    desc: "moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')


let sadas = await fetchJson(`https://darksadas-yt-cineszub-tv-shows.vercel.app/?url=${q}&apikey=pramashi`)



	let msg = `*☘️ Tιтle ➜* *${sadas.data.title}*

*📆 Rᴇʟᴇᴀꜱᴇ ➜* _${sadas.data.date}_
*⭐ Rᴀᴛɪɴɢ ➜* _${sadas.data.imdb}_
*⏰ Rᴜɴᴛɪᴍᴇ ➜* _${sadas.data.Lang}_
*🌎 Cᴏᴜɴᴛʀʏ ➜* _${sadas.data.country}_
*💁‍♂️ Dɪʀᴇᴄᴛᴏʀ ➜* _${sadas.data.subtitle_author}_

*🎉 Follow our chanal :* *https://whatsapp.com/channel/0029VamYYhw2kNFiA46kfl3X*

> *ＨＹＰＥＲ- ＤＬ*
`
await conn.sendMessage(config.JID, { image: { url: sadas.data.image.replace("fit=", "") }, caption: msg })



 await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});








