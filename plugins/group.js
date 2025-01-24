const config = require('../config')
const os = require('os')
const {
    cmd,
    commands
} = require('../command')
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
} = require('../lib/functions')


















cmd({
    pattern: "approve",
    desc: "Automatically approve Specific Country users in the waiting list",
    react: "✅",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { isGroup, isBotAdmins, isAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("This command is only for groups.");
        if (!isBotAdmins) return reply("I need to be a group admin to perform this action.");
        if (!isAdmins) return reply("You must be an admin to use this command.");

        const groupJid = mek.key.remoteJid;
        const response = await conn.groupRequestParticipantsList(groupJid);
        
        if (response.length === 0) {
            return reply("No participants are in the waiting list.");
        }
        const toAddUsers = response.filter(user => user.jid.startsWith(config.AUTO_ADD_Country_Code));

        if (toAddUsers.length === 0) {
            return reply("No +94 users found in the waiting list.");
        }

        const userJids = toAddUsers.map(user => user.jid);
        const approveResponse = await conn.groupRequestParticipantsUpdate(
            groupJid, 
            userJids,
            "approve"
        );

        console.log(approveResponse);
        reply(`Approved the following +94 users:\n${userJids.join("\n")}`);

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply(`Error: ${e}`);
    }
});



cmd({
    pattern: "requests",
    desc: "View pending join requests",
    use: ".requests",
    react: "📝",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply }) => {
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const groupMetadata = await conn.groupMetadata(from);
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);

    if (!isBotAdmin) {
        return await reply("I'm not an admin in this group.");
    }

    try {
        const requests = await conn.groupRequestParticipantsList(from);
        if (requests.length === 0) {
            return await reply("No pending join requests.");
        }

        let msg = "Pending Join Requests:\n\n";
        requests.forEach((request, index) => {
            msg += `${index + 1}. @${request.jid.split("@")[0]}\n`;
        });
        return await reply(msg, { mentions: requests.map(r => r.jid) });
    } catch (error) {
        console.error('Error retrieving join requests:', error);
        return await reply("Failed to retrieve join requests. Please try again later.");
    }
});

// Command to accept group join requests
cmd({
    pattern: "accept",
    desc: "Accept group join request(s)",
    use: ".accept <request numbers>",
    react: "✔️",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, match }) => {
    // Check if the command is being used in a group
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const groupMetadata = await conn.groupMetadata(from);
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);

    if (!isBotAdmin) {
        return await reply("_I'm not an admin in this group._");
    }
    try {
        const requests = await conn.groupRequestParticipantsList(from);
        if (requests.length === 0) {
            return await reply("No pending join requests.");
        }
        if (!match) {
            return await reply("_Provide the number(s) of the request(s) to accept, separated by commas._");
        }
        const indexes = match.split(",").map(num => parseInt(num.trim()) - 1);
        const validIndexes = indexes.filter(index => index >= 0 && index < requests.length);
        if (validIndexes.length === 0) {
            return await reply("_Invalid request number(s)._");
        }
        for (let index of validIndexes) {
            await conn.groupRequestParticipantsUpdate(from, [requests[index].jid], "accept");
        }
        return await reply(`_Accepted ${validIndexes.length} join request(s)._`);
    } catch (error) {
        console.error('Error accepting join requests:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return await reply("Failed to accept join requests. Please try again later.");
    }
});

// Command to reject group join requests
cmd({
    pattern: "reject",
    desc: "Reject group join request(s)",
    use: ".reject <request numbers>",
    react: "❌",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, match }) => {
    if (!isGroup) {
        return await reply("This command can only be used in groups.");
    }
    const botNumber = conn.user.jid;
    const groupMetadata = await conn.groupMetadata(from);
    const isBotAdmin = groupMetadata.participants.some(participant => participant.jid === botNumber && participant.admin);

    if (!isBotAdmin) {
        return await reply("I'm not an admin in this group.");
    }

    try {
        const requests = await conn.groupRequestParticipantsList(from);
        if (requests.length === 0) {
            return await reply("No pending join requests.");
        }
        if (!match) {
            return await reply("Provide the number(s) of the request(s) to reject, separated by commas.");
        }

        const indexes = match.split(",").map(num => parseInt(num.trim()) - 1);
        const validIndexes = indexes.filter(index => index >= 0 && index < requests.length);

        if (validIndexes.length === 0) {
            return await reply("_Invalid request number(s)._");
        }
        for (let index of validIndexes) {
            await conn.groupRequestParticipantsUpdate(from, [requests[index].jid], "reject");
        }

        return await reply(`_Rejected ${validIndexes.length} join request(s)._`);
    } catch (error) {
        console.error('Error rejecting join requests:', error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        return await reply("Failed to reject join requests. Please try again later.");
    }
});



//---------------------------------------------Hide Tag --------------------------------------------

cmd({
    pattern: "hidetag",
    react: "📢",
    alias: ["htag"],
    desc: "Tags everyperson of group without mentioning their numbers",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner  ||  !isAdmins)return;
try { 
if (!m.isGroup) return reply(mg.onlygroup);

if (!isBotAdmins) return reply(mg.needbotadmins);
    conn.sendMessage(m.chat, {
        text: q ? text : "",
        mentions: participants.map((a) => a.id),
    }, {
        quoted: mek 
    });
} catch (e) {
reply('*Error !!*')
l(e)
}
})






























cmd({
    pattern: "kick",
    react: "🥏",
    alias: ["remove"],
    desc: "To Remove a participant from Group",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('This is Group only Command')
		if(!isAdmins) { if ( !isMe) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("❌ *Bot must be Admin Frist*  ❗")
		const mention = await mentionByTag
		let users = await (mention) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *Couldn't find any user in context*")
			await conn.groupParticipantsUpdate(from, [users], "remove")
			await conn.sendMessage(from,{text:`*Removed 🚫*`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
console.log(e)
}
})

cmd({
    pattern: "promote",
    react: "🥏",
    alias: ["addadmin"],
    desc: "To Add a participatant as a Admin",
    category: "group",
    use: '.promote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('This is Group only Command')
		if(!isAdmins) { if ( !isMe) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("*Bot must be admin first ❗*")
		const mention= await mentionByTag
		let users = await (mention) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *Couldn't find any user in context*")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( groupAdmins.includes(users)) return reply('*User all ready and admin ✅*')
		    await conn.groupParticipantsUpdate(from, [users], "promote")
			await conn.sendMessage(from,{text:`*Promoted as an admin ✔️*`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
console.log(e)
}
})


cmd({
    pattern: "demote",
    react: "🥏",
    alias: ["removeadmin"],
    desc: "To Demote Admin to Member",
    category: "group",
    use: '.demote',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
        if (!isGroup) return reply('This is Group only Command')
		if(!isAdmins) { if ( !isMe) return conn.sendMessage(from,{text:"🚫 *This is admin only command*"},{quoted:mek }) }
		if(!isBotAdmins) return reply("*Bot must be admin first ❗*")
		const mention= await mentionByTag
		let users = await (mention) || mek.msg.contextInfo.participant
		if (!users) return reply("🚫 *Couldn't find any user in context*")
		const groupAdmins = await getGroupAdmins(participants) 
		if  ( !groupAdmins.includes(users)) return reply('*User all ready not and admin ✅*')
		    await conn.groupParticipantsUpdate(from, [users], "demote")
			await conn.sendMessage(from,{text:`*User no longer an admin ✔️*`},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
console.log(e)
}
})

cmd({
    pattern: "mute",
    react: "🔒",
    alias: ["close","mute_cyber"],
    desc: "Change to group settings to only admins can send messages.",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isMe) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'announcement')
 await conn.sendMessage(from , { text: `*Group chat muted🔒*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
    pattern: "unmute",
    react: "🔓",
    alias: ["open","unmute_cyber"],
    desc: "Change to group settings to all members can send messages.",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isMe) return reply('🚫 *You must be admin frist*') }
await conn.groupSettingUpdate(from, 'not_announcement')
 await conn.sendMessage(from , { text: `*Group chat unmuted 🔓*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "join",
    desc: "joins group by link",
    category: "main",
    use: '<group link.>',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isSachintha, isSavi, isSadas, isMani, isMe, isOwner,isDev, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isSachintha && !isSavi && !isDev && !isMani && !isMe)return;
try{  if (!q) return reply(`Please give me Query`);
    if (!q.split(" ")[0] && !q.split(" ")[0].includes("whatsapp.com"))
       reply("Link Invalid, Please Send a valid whatsapp Group Link!");
    let result = q.split(" ")[0].split("https://chat.whatsapp.com/")[1];
    await conn.groupAcceptInvite(result)
        .then((res) => reply("*Joined group ✔️*"))
        .catch((err) => reply("Error in Joining Group"));
} catch (e) {
    reply("🚩 Not Found !")
    console.log(e)

}
})
cmd({
    pattern: "del",
    react: "⛔",
    alias: [","],
    desc: "delete message",
    category: "main",
    use: '.del',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, isDev, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isSachintha, isSavi, isSadas, isMani, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const key = {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.quoted.id,
                    participant: m.quoted.sender
                }
                await conn.sendMessage(m.chat, { delete: key })
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "leave",
    react: "🔓",
    alias: ["left","kickme"],
    desc: "To leave from the group",
    category: "group",
    use: '.leave',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) {return reply('🚫 *This is Group command*')}
if (!isMe) {return reply('🚫 *This is Group command*')}
 await conn.sendMessage(from , { text: `🔓 *Good Bye All*` }, { quoted: mek } )
 await conn.groupLeave(from) 
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "invite",
    react: "🖇️",
    alias: ["grouplink","glink"],
    desc: "To Get the Group Invite link",
    category: "group",
    use: '.invite',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('🚫 *This is Group command*')
if (!isBotAdmins) return reply('🚫 *Bot must be Admin frist*')
if (!isAdmins) { if (!isMe) return reply('🚫 *You must be admin frist*') }
const code = await conn.groupInviteCode(from)
//console.log("group code: " + code)
 await conn.sendMessage(from , { text: `🖇️ *Group Link*\n\nhttps://chat.whatsapp.com/${code}`}, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

//await sock.groupRevokeInvite("abcd-xyz@g.us")

cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group informations.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isGroup) return reply('⛔ *This is Group only Command* ')
if (!isBotAdmins) return reply('⛔ *Bot must be Admin Frist* ')
if (!isAdmins) { if (!isMe) return reply('🚫 *You must be a admin frist*') }
const metadata = await conn.groupMetadata(from) 
let ppUrl = await conn.profilePictureUrl( from , 'image')
const gdata = `\n*${metadata.subject}*

🐉 *Group Jid* - ${metadata.id}

📬 *Participant Count* - ${metadata.size}

👤 *Group Creator* - ${metadata.owner}

📃 *Group Description* - ${metadata.desc}

`
await conn.sendMessage(from,{image:{url: ppUrl },caption: gdata },{quoted:mek })
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
console.log(e)
}
})
cmd({
    pattern: "block",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group informations.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{

if (!isMe) return reply('⛔ *OWNER ONLY COMMAND* ')


   await conn.updateBlockStatus(from, 'block')
	
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
console.log(e)
}
})


	
cmd({
    pattern: "add",
    desc: "Add a member to the group.",
    category: "group",
    react: "➕",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('*🚨 ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ɪɴ ɢʀᴏᴜᴘ*')
        if (!isBotAdmins) return reply('*🚨 ᴘʟᴇᴀꜱᴇ ɢɪᴠᴇ ᴍᴇ ᴀᴅᴍɪɴ.*')
        if (!isAdmins && !isMe) return reply('*🚨 ᴏɴʟʏ ᴀᴅᴍɪɴ ᴄᴀɴ ʏᴏᴜ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ*')

        const user = q.split(' ')[0]
        if (!user) return reply('Please provide a phone number to add.')

        await conn.groupParticipantsUpdate(from, [`${user}@s.whatsapp.net`], 'add')
        await reply(`@${user} has been added to the group.`, { mentions: [`${user}@s.whatsapp.net`] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
cmd({
    pattern: "end",
    desc: "Remove all members from the group (except bot and group creator).",
    category: "group",
    filename: __filename,
    react: "🚫"
},
async(conn, mek, m, { from, isGroup, isAdmins, isOwner, isBotAdmins, isMe, groupMetadata, reply }) => {
    try {


        if (!isOwner && !isMe && !isAdmins && !isBotAdmins) return reply('This command can only be used by the bot owner.');

        const creator = groupMetadata.owner;
        const botId = conn.user.id;
        const participants = groupMetadata.participants.filter(p => p.id !== creator && p.id !== botId);

        await conn.groupParticipantsUpdate(from, participants.map(p => p.id), "remove");
        reply(`*🚫 All members have been removed from the group (except the bot and group creator).*`);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});


//================================tagall================================


//==============================tagadmin======================================
cmd({
    pattern: "tagadmin",
    desc: "Tags all the admins in the group.",
    category: "group",
    use : ".tagadmin",
    filename: __filename,
},           
async (conn, mek, m, { from, isGroup, groupMetadata, groupAdmins, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`This command is only for groups.`);
        
        // Fetch all group admins
        const admins = groupAdmins;

        if (admins.length === 0) {
            return reply('There are no admins in this group.');
        }

        // Create a message with all admin tags
        let adminTagMessage = '*Tagging all admins in the group:*\n\n';
        for (let admin of admins) {
            adminTagMessage += `@${admin.split('@')[0]}\n`;  // Mention each admin by their number
        }

        // Send the message and tag the admins
        await conn.sendMessage(from, { text: adminTagMessage, mentions: admins }, { quoted: mek });

    } catch (e) {
        console.error('Error tagging admins:', e);
        reply('An error occurred while trying to tag all admins. Please try again.');
    }
});



cmd({
    pattern: "boom",
    desc: "forward msgs",
    alias: ["bbb"],
    category: "owner",
    use: '.boom <jid> & <count>',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

if (!isOwner) {
	return reply("*Owner Only ❌*")}
	
if (!q || !m.quoted) {
reply("*give me message ❌*")
}


const data = q.split(" & ")[0] 
const datas = q.split(" & ")[1]   
	
let i = 0
const end = datas


let p;
let message = {}

            message.key = mek.quoted?.fakeObj?.key;

            if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
            
		let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype

const mimeType = require('mime-types');
let ext = mimeType.extension(mime);		    

                mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = (p ? p : mek.quoted.documentWithCaptionMessage.message.documentMessage.caption) + "." + ext;
            }

            message.message = mek.quoted;

while (i < end) {
const mass =  await conn.forwardMessage(data, message, false)
i++
}
	
return reply(`*Boom sender to:*\n\n ${data}`)
            
})


cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    use: '.shutdown',
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    use: '.broadcast',
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 Message broadcasted to all groups.");
});
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    use: '.clearchats',
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});
