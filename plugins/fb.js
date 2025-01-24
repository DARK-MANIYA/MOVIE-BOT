const config = require('../config')
const getFbVideoInfo = require("fb-downloader-scrapper")
const {
    cmd,
    commands
} = require('../command')


cmd({
    pattern: "fb",
    alias: ["facebook"],
    use: '.fb < tiktok url >',
    react: "🎥",
    desc: 'Download videos from facebook',
    category: "download",
    filename: __filename

},

    async (conn, m, mek, { from, prefix, q, reply }) => {
        if (!q || !q.includes('facebook.com')) return await reply('*Please enter a valid facebook url!*');
        const url = q.replace(/\?mibextid=[^&]*/, '');
        getFbVideoInfo(url)
            .then((result) => {
               
let dat = `*💨HYPER FB DOWNLODER💨*`

                const buttons = [
        {buttonId: prefix + 'downfb ' + result.sd, buttonText: {displayText: 'SD Quality'}, type: 1},
           {buttonId: prefix + 'downfb ' + result.hd, buttonText: {displayText: 'HD Quality'}, type: 1}
        
      ]
        const buttonMessage = {
            caption: dat,
            footer: config.FOOTER,
            buttons: buttons,
            headerType: 1
        }
        return conn.buttonMessage(from, buttonMessage, mek)
       }).catch((err) => {
                console.log(err)
            })


    });




cmd({
    pattern: "downfb",
    react: "🎥",
    dontAddCommandList: true,
    filename: __filename
},

    async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Not Found!*')

            await conn.sendMessage(from, { video: { url: q } }, { quoted: mek })
            await conn.sendMessage(from, { react: { text: '✔️', key: mek.key } })

        } catch (e) {
            reply('*Error !!*')
            console.log(e)
        }
    })




