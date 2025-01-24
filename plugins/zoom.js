const axios = require('axios');
const mime = require('mime-types');  // Make sure to install mime-types package
const cheerio = require('cheerio');
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { File } = require('megajs');
const config = require('../config')
const { sinhalaSub } = require("mrnima-moviedl")
const {
  cmd,
  commands
} = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')


                    
cmd({
    pattern: "zoom",	
    react: '📑',
    category: "movie",
    desc: "Zooom subtitle downloader",
    filename: __filename
},
async (conn, m, mek, { from, q, isDev, prefix, reply }) => {
try{

        if(!q) return await reply('*please give me text !..*')
const url = `https://zoom.lk/?s=${q}`;
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let result = [];
    $("div.td-pb-span8.td-main-content > div > div.td_module_16.td_module_wrap.td-animation-stack").each((c, d) => {
        result.push({
             time: $(d).find("div.item-details > div > span > time").text(),
             title: $(d).find("div.item-details > h3 > a").text(),
             author: $(d).find("div.item-details > div > span > a").text(),
             desc: $(d).find("div.item-details > div.td-excerpt").text(),
             comments: $(d).find("div.item-details > div > span.td-module-comments a").text(),
             image: $(d).find("div.td-module-thumb > img").attr("src"),
	     link: $(d).find("div.item-details > h3 > a").attr("href"),	
           /*const link = d.find("div.cm-entry-summary > a").attr("href");
           const lin2 = d.find("div.cm-entry-summary > div:nth-child(35) > a").attr("href");
           const dllinks = lin2 ? lin2 : link*/

        })
    })
        if (result.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )


 var rows = [];  
 result.map((v) => {
	rows.push({
        buttonId: prefix + `zoomdl ${v.link}`,
        buttonText: { displayText: `${v.title}` },
        type: 1
          });
        })
const msg = `*🎞️ ZOOM SUBDL SEARCH 🎞️*`
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
    pattern: "zoomdl",	
    //react: '📑',
    //category: "movie",
    desc: "sinhalasub moive downloader",
    filename: __filename
},
    async ( conn, mek, m, { reply, q, isDev, l, prefix,  from }) => {
 
	    try {
		    if (!q) return await reply("please give me text !..")
               
const response = await axios.get(q);	
const $ = cheerio.load(response.data);
      const title = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_title.tdi_60.tdb-single-title.td-pb-border-top.td_block_template_17 > div > h1").text();
      const author = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_64.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > ul > li > a").text();
      const view = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_67.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > span").text();
      const date = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_70.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > time").text();
      const size = $("#tdi_81 > div > div.vc_column.tdi_84.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_single_content.tdi_86.td-pb-border-top.td_block_template_17.td-post-content.tagdiv-type > div > p > a > small").text();
      const dllink = $("div.tdb-block-inner.td-fix-index > p > a").attr("href");
		    
                      const msg = `*🎞️ ZOOM SUBDL DOWNLOADER 🎞️*\n\n
📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n
⏳ *Views:* ${view}\n`


 const buttons = [
        {buttonId:`${prefix}zdl ${dllink}±${title}` , buttonText: {displayText: 'DOWNLOAD'}, type: 1}
        
      ]
        const buttonMessage = {
		image: {url: config.LOGO },	
            caption: msg,
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
    pattern: "zdl",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
    const data = q.split("±")[0]
        const datas = q.split("±")[1]
       

        const mediaUrl = data.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: `${datas}
     
   *ＤＡＲＫ ＳＨＵＴＥＲ ＭＤ Ｖ2*`,
            mimetype: "application/rar",
            fileName: `🎬DARK SHUTER🎬.rar`,
        };

        await conn.sendMessage(config.JID, message);

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});

cmd({
    pattern: "mp4dl",
    react: "📥",
category: "movie",
    desc: "Direct mp4 downloader",
    
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('*ex : .mp4dl direct link ± Sadas ');
    }


    try {
    const data = q.split("±")[0]
        const datas = q.split("±")[1]
       

        const mediaUrl = data.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: `${datas}
     
   *ＤＡＲＫ ＳＨＵＴＥＲ ＭＤ Ｖ2*`,
            mimetype: "video/mp4",
            fileName: `DARK SHUTER.mp4`,
        };

        await conn.sendMessage(config.JID, message);

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});


cmd({
    pattern: "mkvdl",
    react: "📥",
   category: "movie",
    desc: "Direct mkv downloader",
    filename: __filename
}, async (conn, mek, m, { from, q, isMe, reply }) => {
	
    if (!q) {
        return await reply('**ex : .mp4dl direct link ± Sadas *');
    }


    try {
    const data = q.split("±")[0]
        const datas = q.split("±")[1]
       

        const mediaUrl = data.trim();

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');




        const message = {
            document: mediaBuffer,
	    caption: `${datas}
     
   *ＤＡＲＫ ＳＨＵＴＥＲ ＭＤ Ｖ2*`,
            mimetype: "video/mp4",
            fileName: `🎬DARK SHUTER🎬.mkv`,
        };

        await conn.sendMessage(config.JID, message);

        await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});








