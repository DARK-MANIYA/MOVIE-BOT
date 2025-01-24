const config = require('../config');
const fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "update",
    react: "🔄",
    desc: "Update folder from GitHub",
    category: "owner",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/DarksadasYT12/sadas.git'; // GitHub repository URL
        const targetFolder = 'plugins'; // Folder to update

        // Check if target folder exists
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder); // Create folder if it doesn't exist
        }

        // Determine the appropriate Git command
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull`
            : `git clone ${repoUrl} ${targetFolder}`;

        // Execute the Git command and handle errors and success
        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(new Error(`Git command failed: ${stderr}`));
                } else {
                    resolve(stdout);
                }
            });
        });

        // Send success message
        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`*❌ Error during update:* ${error.message}`);
    }
});
