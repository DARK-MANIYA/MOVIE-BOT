const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { sinhalaSub } = require("mrnima-moviedl")
const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

cmd({
    pattern: "testsin",
    alias: ["testsinn","tests"],
    use: '.movie <query>',
    react: "🔎",
    desc: "Moive downloader",
    category: "movie",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let sadas = await fetchJson(`https://darksadas-yt-sinhalasub-search.vercel.app/?q=${q}`)
const msg = `*🎥 DARK SHUTER MOVIE SEARCH 🎥*`

if (sadas.data.length < 1) return await conn.sendMessage(from, { text: "🚩 *I couldn't find anything :(*" }, { quoted: mek } )

  var rows = [];  
  sadas.data.map((v) => {
	rows.push({
        buttonId: `.tsts ${v.Link}`,
        buttonText: { displayText: `${v.Title}` },
        type: 1
          });
        })

const buttonMessage = {
 
image: {url: config.LOGO},	
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
    pattern: "tsts",
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
        buttonId: prefix + `mn ${v.link}±${sadas.title} - ${v.quality} - ${v.size}`,
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
    pattern: "mvkdd",
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
	    
	    
	    
const l = `${dl}`



let mfg = `*DOWNLOAD MOVIE*`
 const buttons = [
        {buttonId:`${prefix}fit ${dl}±${datas}` , buttonText: {displayText: 'DOWNLOAD'}, type: 1}
        
      ]
        const buttonMessage = {
		image: {url: config.LOGO },	
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
    pattern: "fit",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }
  const data = q.split("±")[0]
        const datas = q.split("±")[1]



    try {
 
		



        const mediaUrl = data.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: `${datas}
     
> _*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ*_`,
            mimetype: "video/mp4",
            fileName: `${datas}🎬HYPER MOVIE DL🎬.mp4`,
        };

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
	



 const msg = `   *🎥 HYPER MOVIE DOWNLODER 🎥*
 
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


