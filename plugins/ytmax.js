const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs-extra')
const pk = "`("
const pk2 = ")`"
const oce = "`"
var uploader = "🎬 TC TEAM MOVIE-DL 🎬 "





cmd({              
    pattern: "ytsmx",	
    react: '📑',
    category: "search",
    desc: "yts.x moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isDev, prefix, reply }) => {
try{

        if(!q) return await reply('*please give me text !..*')
const url = `https://yts.mx/browse-movies/${q}/all/all/0/latest/0/all`
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let result = [];
    $("section > div.row > div").each((c, d) => {
        result.push({
             title: $(d).find("div.browse-movie-bottom > a").text(),
             year: $(d).find("div.browse-movie-bottom > div").text(),
             link: $(d).find("a").attr("href"),
             image: $(d).find("a > figure > img").attr("src"),
             rating: $(d).find("a > figure > figcaption > h4.rating").text(),
             danne: $(d).find("a > figure > figcaption > h4").eq(1).text(),
             danne1: $(d).find("a > figure > figcaption > h4").eq(2).text(),
           

        })
    })
        if (result.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )



 var rows = [];  
 result.map((v) => {
	rows.push({
        buttonId: prefix + `ytmx ${v.link}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })
const msg = `*🎞️ YTSMX SEARCH 🎞️*`
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
    pattern: "ytmx",	
    react: '📑',
    category: "search",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
    async (conn, m, mek, { from, q, reply, isDev, prefix }) => {
try{
	if(!q) return await reply('*please give me text !..*')
	
               
const response = await axios.get(q);	
const $ = cheerio.load(response.data);

	const title = $("#mobile-movie-info > h1").text();
        const year = $("#mobile-movie-info > h2:nth-child(2)").eq(0).text();
        const language = $("#mobile-movie-info > h2 > span").text();
        const image = $("#movie-poster > img").attr("src");
        const enter = $("#mobile-movie-info > h2").eq(1).text();
        let download_links = [];
      $("div.modal.modal-download.hidden-xs.hidden-sm > div > div > div").each((c, d) => {
          download_links.push({ 
               quality: $(d).find("div > span").text(),
               type: $(d).find("p.quality-size").eq(0).text(),
               size: $(d).find("p.quality-size").eq(1).text(),
               torrent_file: $(d).find("a").attr("href"),
               magnet: $(d).find("a.magnet-download.download-torrent.magnet").attr("href"),
          })
      })
	
	   if (download_links.length < 1) return await conn.sendMessage(from, { text: `🚫 Download Link Not Found: *${q}*` }, { quoted: mek } )
 var rows = [];  
 download_links.map((v) => {
	rows.push({
        buttonId: prefix + `ytmxdl ${v.torrent_file}`,
        buttonText: { displayText: `${v.size}` },
        type: 1
          });
        })
const msg = `*🎞️ YTSMX SEARCH 🎞️*`
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
    pattern: "ytmxdl",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {

	 await conn.sendMessage(from, { text : `*Downloading your movie..⬇️*` }, {quoted: mek} )    
    
	    

let sadas = await fetchJson(`https://torrent-to-direct-zazie.vercel.app/api/direct?torrent=${q}&apikey=nbt15`)
	    const mh = `${sadas.files.dl_link}`
	    
        const mediaUrl = mh.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');



        const message = {
            document: mediaBuffer,
	    caption: `*🎬 Name :* ${sadas.files.name}


> _*ＨＹＰＥＲ ＭＯＶＩＥ ＤＬ*_`,
            mimetype: "video/mp4",

            fileName: `${sadas.files.name}.mp4`,
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




















