const { File } = require('megajs');
const fs = require('fs')
const { igdl } = require('ruhend-scraper')
const googleTTS = require("google-tts-api");
const axios = require('axios');
const apilink = 'https://www.dark-yasiya-api.site/news' // API LINK ( DO NOT CHANGE THIS!! )
const config = require('../config')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fileType = require("file-type");
const path = require('path')
const { tmpdir } = require("os")
const fetch = require('node-fetch')
var needus = "🚩*Please Give Me GitHub Repo URL!*" 
var cantf = "🚩 *I Can't Find This Repo!*" 
const Crypto = require("crypto")
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

async function videoToWebp (media) {

    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)

    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
}

function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}

function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}



cmd({
    pattern: "logo1",
    desc: "image.",
    react: "🌌",
    category: "other",
    use: '.logo1',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try {
    if (!q) return reply('Please Provide A Name');
    await conn.sendMessage(from, { 
        image: { url: `https://dummyimage.com/600x400/&text=${q}` }, 
        caption: config.FOOTER 
    }, {quoted: mek});

} catch (e) {
    console.log(e);
    reply(`${e}`);
}
})

cmd({
    pattern: "logo2",
    desc: "image.",
    react: "🌌",
    category: "other",
    use: '.logo2',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try {
    if (!q) return reply('Please Provide A Name');
    await conn.sendMessage(from, { 
        image: { url: `https://www.flamingtext.com/net-fu/proxy_form.cgi?&script=fluffy-logo&text=${q}` }, 
        caption: config.FOOTER 
    }, {quoted: mek});

} catch (e) {
    console.log(e);
    reply(`${e}`);
}
})















cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
	use: '.weather colombo',
    category: "other",
	
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;
const wa = config.FOOTER
        const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍

🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

${wa}
`;

        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 ¢ιту ησт ƒσυη∂. ρℓєαѕє ¢нє¢к тнє ѕρєℓℓιηg αη∂ тяу αgαιη.");
        }
        return reply("⚠️ αη єяяσя σ¢¢υяяє∂ ωнιℓє тяαηѕℓαтιηg тнє тєχт. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});


cmd({
    pattern: "ttp",
    react: "✨",
    alias: ["texttos"],
    desc: "Text to convert sticker",
    category: "other",
    use: '.ttp HI',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let bufff = await getBuffer("https://ruloaooa-swgen.hf.space/brat?text=" + q)
await conn.sendMessage(from, {sticker: bufff}, {quoted: mek })
} catch (e) {
console.log(e)
}
})



var imgmsg =''
if(config.LANG === 'SI') imgmsg = '*ඡායාරූපයකට mention දෙන්න!*'
else imgmsg = "*Reply to a photo !*"
var descg = ''
if(config.LANG === 'SI') descg = "එය ඔබගේ mention දුන් ඡායාරූපය ස්ටිකර් බවට පරිවර්තනය කරයි."
else descg = "It converts your replied photo to sticker."
cmd({
    pattern: "sticker",
    react: "🔮",
    alias: ["s","stic"],
    desc: "Convert to sticker",
    category: "other",
    use: '.sticker <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
     if ((m.type === 'imageMessage') || isQuotedImage) {
      var nameJpg = getRandom('')
      isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let sticker = new Sticker(nameJpg + '.jpg', {
      pack: pushname, // The pack name
      author: '', // The author name
      type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
      categories: ["🤩", "🎉"], // The sticker category
      id: "12345", // The sticker id
      quality: 75, // The quality of the output file
      background: "transparent", // The sticker background color (only for full stickers)
  });
  const buffer = await sticker.toBuffer();
  return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}  else if ( isQuotedSticker ) { 

    var nameWebp = getRandom('')
    await m.quoted.download(nameWebp)
  let sticker = new Sticker(nameWebp + '.webp', {
    pack: pushname, // The pack name
    author: '', // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 75, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}else return await  reply(imgmsg)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

async function videoToWebp (media) {

    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)

    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
}
var imgmsg = "*Please give me a text !*"
var descg = "it converts a text to gif sticker."
var descdg = "it converts a text to sticker."
cmd({
    pattern: "attp",
    react: "✨",
    alias: ["texttogif"],
    desc: "Text to convert sticker",
    category: "convert",
    use: '.attp HI',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return await reply(imgmsg)
let bufff = await getBuffer("https://api-fix.onrender.com/api/maker/attp?text=" + q)
await conn.sendMessage(from, {sticker: await videoToWebp(bufff)}, {quoted: mek })
} catch (e) {
console.log(e)
}
})



cmd({
    pattern: "fancy",	
    react: '🪄',
    category: "other",
    desc: "fancy",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')

let url = await fetchJson(`https://www.dark-yasiya-api.site/other/font?text=${q}`)

  if (url.length < 1) return await conn.sendMessage(from, { text: 'erro !' }, { quoted: mek } )


 var rows = [];  
  url.result.map((v) => {
	rows.push({
        buttonId: prefix + `fandl ${v.result}`,
        buttonText: { displayText: `${v.result}` },
        type: 1
          });
        })


const msg = `*🧧 HYPER FANCY TEXT 🧧*`
  
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
    pattern: "fandl",	
    react: '🪄',
    //category: "convert",
    desc: "fancy",
    filename: __filename
},
async (conn, m, mek, { from, q, prefix, isMe, reply }) => {
try{


     if(!q) return await reply('*please give me text !..*')


await reply(q)

} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})







cmd({
    pattern: "ai",
    desc: "AI chat.",
    use: '.ai < Hi >',
    react: "👾",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
  
        let data = await fetchJson(`https://www.dark-yasiya-api.site/ai/gemini?q=${q}`)
        return reply(`*${data.result}`)
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "tempmail",
    desc: "Generate a temporary email address.",
    use: '.tempmail',
    category: "other",
    react: "✉️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, isGroup, sender, senderNumber, reply }) => {
    try {
    

        // API URL to generate a random temporary email
        const url = `https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1`;

        // Fetch the temporary email from 1secmail API
        const response = await axios.get(url);
        const data = response.data;

        // Check if an email was successfully generated
        if (!data || data.length === 0) {
            return reply("Error: Unable to generate a temporary email. Please try again later.");
        }

        const tempEmail = data[0]; // Extract the first generated email

        // Send the generated temporary email to the user
        await conn.sendMessage(from, { 
            text: `✉️ *Temporary Email Generated*\n\n📧 Email: ${tempEmail}`,
            footer: 'test'
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "npm",
    desc: "Search for a package on npm.",
    react: "📦",
    use: '.npm < name >',
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args.length) return reply("Please provide the name of the npm package you want to search for. Example: !npm express");
    const packageName = args.join(" ");
    const url = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;
    try {
               
        // Fetch package details from npm registry
        let response = await fetch(url);
        if (!response.ok) throw new Error("Package not found or an error occurred.");
        let packageData = await response.json();
        // Prepare response details
        const latestVersion = packageData["dist-tags"].latest;
        const description = packageData.description || "No description available.";
        const homepage = packageData.homepage || "No homepage available.";
        const npmUrl = `https://www.npmjs.com/package/${packageName}`;
        const author = packageData.author ? packageData.author.name || "Unknown" : "Unknown";
        const license = packageData.license || "Unknown";
        const repository = packageData.repository ? packageData.repository.url || "Not available" : "Not available";
        const keywords = packageData.keywords ? packageData.keywords.join(", ") : "No keywords provided";
        // Send the package details as a reply (without image)
        let replyText = `
*ＮＰＭ ＳＥＡＲＣＨ ツ*


*🔰Npm package :* ${packageName}

*📄Description :* ${description}

*⏸️ Last version :* ${latestVersion}

*🪪 License :* ${license}

*🪩Repostory :* ${repository}

*🔗Npm url :* ${npmUrl}

`
        await conn.sendMessage(from, { text: replyText }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//




cmd({
    pattern: "trt",
    desc: "Translate text between languages",
    react: "🌐",
    use: '.trt < si hi >',
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}

`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ αη єяяσя σ¢¢υяяє∂ ωнιℓє тяαηѕℓαтιηg тнє тєχт. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});


cmd({
    pattern: "readmore",
    desc: "Readmore message",
    category: "other",
    use: '.readmore < text >',
    react: "📝",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender
}) => {
    try {
        // Get the message text after the command (.readmore text)
        let readmoreText = q ? q : "No text provided";

        // Create the "Readmore" effect by adding a special character to split the text
        let readmore = "\u200B".repeat(4000); // This creates a large gap between text

        // Full message to send
        let replyText = `${readmore}${readmoreText}`;

        // Send the message with the "Readmore" functionality
        await conn.sendMessage(from, { text: replyText }, { quoted: mek });

        // React to the message
        await conn.sendMessage(from, { react: { text: "", key: mek.key } });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});


cmd({
    pattern: "obfus",
    desc: "Encript codes",
    category: "other",
    use: '.obfus < code >',
    react: "📝",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{


    
let data = await fetchJson(`https://js-obfuscator-api.vercel.app/obfuscator/code=${q}`)
reply(`data.obfuscator.code`)
     }catch(e){
      console.log(e)
      reply(`${e}`)
    }
    })

cmd({
    pattern: "mfire",
    alias: ["mf","mediafire"],
    react: "🔥",
    desc: "Mediafire download",
    category: "download",
    use: '.mfire < mediafire url >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{
  
if(!q) return await reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖬𝖾𝖽𝗂𝖺𝖿𝗂𝗋𝖾 𝖴𝗋𝗅");
 
  let mfire = await fetchJson(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`)

await conn.sendMessage(from, { document: { url: mfire.result.dl_link }, mimetype: mfire.result.fileType , fileName: mfire.result.fileName, caption: mfire.result.fileName }, { quoted: mek });

 }catch(e){
      console.log(e)
      reply(`${e}`)
    }
    })


    
cmd({
    pattern: "mega",
    react: "🍟",
    alias: ["megadl","meganz"],
    desc: "Mega.nz fils download",
    category: "download",
    use: '.mega url',
    filename: __filename
}, 
    async (conn, mek, m, { from, q, reply }) => {
    if (!q) {
        return await reply('*Please provide a mega.nz URL!*');
    }

    try {
        const file = File.fromURL(q)
        await file.loadAttributes()
        //if (file.size >= 2048 * 1024 * 1024) return reply(`File size exeeded...\nMaximum Upload Size Is ${config.MAX_SIZ} MB`)
        const data = await file.downloadBuffer();
        
        if (/mp4/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "video/mp4", filename: `${file.name}` }, { quoted: mek });
        } else if (/pdf/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/pdf", filename: `${file.name}` }, { quoted: mek });
        } else if (/zip/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/zip", filename: `${file.name}` }, { quoted: mek });
        } else if (/rar/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/x-rar-compressed", filename: `${file.name}` }, { quoted: mek });
        } else if (/7z/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "application/x-7z-compressed", filename: `${file.name}` }, { quoted: mek });
        } else if (/jpg|jpeg/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "image/jpeg", filename: `${file.name}` }, { quoted: mek });
        } else if (/png/.test(file.name)) {
            await conn.sendMessage(from, { document: data, mimetype: "image/png", filename: `${file.name}` }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { document: data, mimetype: "application/octet-stream", filename: `${file.name}` }, { quoted: mek })
        }
        
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});
cmd({
    pattern: "hirunews",
    alias: ["hiru","news1"],
    react: "⭐",
    desc: "Hiru news",
    category: "other",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/hiru`)
  
const msg = `
           ⭐ *HIRU NEWS* ⭐

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url}
`

          // Sending the image with caption
         await conn.sendMessage(from, { image: { url: news.result.image }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})



cmd({
    pattern: "download",
    react: "🍟",
    alias: ["dn"],
    desc: "Movie download",
    category: "extra",
    use: '.download < Direct Link >',
    dontAddCommandList: false,
    filename: __filename
},
async(conn, mek, m, { from, q, sender, reply }) => {
    try {
      

        if (!q) return reply('❗ කරුණාකර download link එකක් ලබා දෙන්න.');

        const data = q.trim();
        const urlRegex = /^(https?:\/\/[^\s]+)/;

        // URL එකේ format එක validate කරනවා
        if (!urlRegex.test(data)) {
            return reply('❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න.');
        }

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        // Document (file) එක යවනවා
        await conn.sendMessage(from, { 
            document: { url: data },
            caption: `\n\n> *TEST*`,
            mimetype: "video/mp4",
            fileName: `test.mp4`
        });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('❗ Error: ' + e.message);
    }
});































cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "🔺",
    desc: "Sirasa news",
    category: "other",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/sirasa`)
  
const msg = `
           🔺 *SIRASA NEWS* 🔺

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url}
`

          // Sending the image with caption
             await conn.sendMessage(from, { image: { url: news.result.image }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})


cmd({
    pattern: "derananews",
    alias: ["derana","news3"],
    react: "📑",
    desc: "Derana news",
    category: "other",
    use: '.derana',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/derana`)
  
const msg = `
           📑 *DERANA NEWS* 📑

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Date* - ${news.result.date}

• *Link* - ${news.result.url}
`

await conn.sendMessage(from, { image: { url: news.result.image }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "lankadeepanews",
    alias: ["lankadeepa","news4"],
    react: "🕵️‍♂️",
    desc: "Lankadeepa news",
    category: "other",
    use: '.lankadeepanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/lankadeepa`)
  
const msg = `
           🕵️‍♂️ *LANKADEEPA NEWS* 🕵️‍♂️

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Date* - ${news.result.date}

• *Link* - ${news.result.url}
`

await conn.sendMessage(from, { image: { url: news.result.image }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "bbcnews",
    alias: ["bbc","news5"],
    react: "⛩",
    desc: "Bbc news",
    category: "other",
    use: '.bbcnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/bbc`)
  
const msg = `
           ⛩ *BBC NEWS* ⛩

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url} 
`

await conn.sendMessage(from, { image: { url: news.result.image }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})


cmd({
            pattern: "tts",
            react: "❄️",
            desc: "text to speech.",
            category: "other",
            filename: __filename,
            use: '.tts <Im Asitha>',
        },
        async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, i, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
        try{
          if (!q) return m.reply('Please give me Sentence to change into audio.')
            let texttts = q
            const ttsurl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            });
            return conn.sendMessage( m.chat, {
                audio: {
                    url: ttsurl,
                },
                mimetype: "audio/mpeg",
                fileName: `ttsCitelVoid.m4a`,
            }, {
                quoted: mek,
            });

                
} catch (e) {
reply('*Error !!*')
reply(e)
}
});



cmd({

    pattern: "ig",
    desc: "To get the instragram.",
    react: "📑",
    use: '.ig < Link >',
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
    
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

         let res = await igdl(q);
        
         let data = await res.data;
         for (let i = 0; i < 20; i++) {
            let media = data[i];
            let downloadurl = media.url
             m.react('⬆️')
            await conn.sendMessage(from,{video: {url:downloadurl},mimetype:"video/mp4",caption: config.FOOTER},{quoted:mek})
             m.react('✅')
         }

}catch(e){
console.log(e)
}
})






cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    use: '.animegirl < Name >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '👧 *Random Anime Girl Image* 👧' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching anime girl image: ${e.message}`);
    }
});


cmd({
    pattern: "upmv",
    react: "✔️",
    alias: ["upmvk"],
    desc: "Movie Searcher",
    category: "movie",
    use: '.downjid < Jid > & < Name >',
    dontAddCommandList : false ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

        // Check if the sender is a premium user
        
if ( !m.quoted ) return reply('*ℹ Please mention a Derect Link*')
if ( !q ) return 
const data = q.split(" & ")[0] 
const datas = q.split(" & ")[1] 
 await conn.sendMessage(data, { document : { url : m.quoted.msg  } ,caption: `\n${datas}\n\n *ＤＡＲＫ ＳＨＵＴＥＲ ＭＤ Ｖ2* `  ,mimetype: "video/mp4" , fileName: `${datas}.mp4` } )
		} catch (e) {
reply('❗ Error' + e )
l(e)
}
})




cmd({
    pattern: "gitclone",
    alias: ["gitdl"],
    react: '💫',
    desc: "Download git repos",
    category: "other",
    use: '.gitclone <repo link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      if (!q) return await  reply(needus)
      let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
      let linknya = q
      if (!regex1.test(linknya)) return reply("🚩*Please Give Me Valid GitHub Repo Link!*");
      let [, user, repo] = q.match(regex1) || []
      repo = repo.replace(/.git$/, '')
      let url = `https://api.github.com/repos/${user}/${repo}/zipball`
      let filename = (await fetch(url, {
         method: 'HEAD'
      })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
      let wm = config.FOOTER
      await conn.sendMessage(from, { document: { url: url }, mimetype: 'application/zip', fileName: filename, caption: wm}, { quoted: mek })
} catch (e) {
reply(cantf)
console.log(e)
}
})














cmd({
    pattern: "toptt",
    react: "🔊",
    alias: ["toaudio","tomp3"],
    desc: "convert to audio",
    category: "other",
    use: '.toptt <Reply to video>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let isquotedvid = m.quoted ? (m.quoted.type === 'videoMessage') : m ? (m.type === 'videoMessage') : false
    if(!isquotedvid) return await reply()
    let media = m.quoted ? await m.quoted.download() : await m.download()
    let auddio = await toPTT(media, 'mp4')
    let senda =  await conn.sendMessage(m.chat, {audio: auddio.options, mimetype:'audio/mpeg'}, {quoted:m})
    await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})       



