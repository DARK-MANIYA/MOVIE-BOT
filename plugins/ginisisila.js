
const axios = require('axios');
const mime = require('mime-types');  // Make sure to install mime-types package
const cheerio = require('cheerio');
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require('fs-extra');
const config = require('../config')
const {
  cmd,
  commands
} = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')


cmd({
    pattern: "ginisisila",	
    react: '📑',
    category: "search",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, reply, prefix, isDev }) => {
try{
	//if (!isGroup) return reply('🚫 *This is Group command*')
        if(!q) return await reply('*please give me text !..*')
	const url = `https://ginisisilacartoon.net/search.php?q=${q}`
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let result = [];
    $("#page_panels_ > table > tbody > tr > td > div").each((c, d) => {
        result.push({
             title: $(d).find("div.video-title").text(),
             date: $(d).find("div.posted-time").text(),
             image: $(d).find("a > img").attr("src"),
             link: $(d).find("a").attr("href"),

        })
    })

	

        if (result.length < 1) return await conn.sendMessage(from, { text: `➥ No results to show with *${q}*` }, { quoted: mek } )


 var rows = [];  
  result.map((v) => {
	rows.push({
        buttonId: prefix + `ginidl ${v.link}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })


const msg = `*🎥 DARK SHUTER MOVIE SEARCH 🎥*`
  
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
    pattern: "ginidl",	
    react: '📥',
    category: "search",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
    async ( conn, mek, m, { reply, q, l, isDev, from, prefix }) => {
	    try {
		    const genurl = `https://ginisisilacartoon.net/${q}`
		    const response = await axios.get(genurl);
                    const $ = cheerio.load(response.data);
		    const download = $("#player-holder > div > iframe").attr("src");
		    const mtitle = $("#watch-contentHd").text();
		    
		   
		    
		    const msg = `𝗖𝗔𝗥𝗧𝗢𝗢𝗡 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥\n\n
📃 *Title:* ${mtitle}`

                const buttons = [
  {buttonId: prefix + 'ytaa ' + download, buttonText: {displayText: 'DOWNLOAD'}, type: 1}

	]
const buttonMessage = {
    image: {url: config.LOGO},
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






















