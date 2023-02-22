"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./utils/storage/index");
const Discord = require("discord.js");
const embed_1 = require("./utils/embed/");
const scan_1 = require("./utils/scan");
const dotenv = require("dotenv");
dotenv.config();
console.clear();
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', message => {
    if (!message.author.bot) {
        if ("name" in message.channel && message.channel.name === 'stats') {
            scan_1.Scan(message);
        }
        else {
            if (message.content.startsWith(`${process.env.PREFIX}stats`)) {
                const mentions = message.mentions.users;
                for (let mention_info of mentions) {
                    const mention = mention_info[1];
                    const info = index_1.getDetails(mention.username);
                    if (!info) {
                        message.channel.send(`No info for user @${mention.username}`).then(msg => msg.delete({ timeout: 30000 }));
                    }
                    else {
                        message.channel.send(new embed_1.default(info.user, info.details, info.screenshot_url).embed);
                    }
                }
                // console.log(mentions)
            }
        }
    }
});
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map