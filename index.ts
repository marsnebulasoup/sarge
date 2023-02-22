import { getDetails } from './utils/storage/index';
import Discord = require('discord.js');
import StatsEmbed from "./utils/embed/";
import { Scan } from "./utils/scan";


console.clear()

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.author.bot) {
    if ("name" in message.channel && message.channel.name === 'stats') {
      Scan(message)
    }
    else {
      if (message.content.startsWith(`${process.env.PREFIX}stats`)) {
        const mentions = message.mentions.users;
        for (let mention_info of mentions) {
          const mention = mention_info[1]
          const info = getDetails(mention.username)
          console.log(mention.username)
          if (!info) {
            message.channel.send(`No info for user @${mention.username}`).then(msg => msg.delete({ timeout: 30000 }))
          }
          else {
            message.channel.send(new StatsEmbed(info.user, info.details, info.screenshot_url).embed)
          }
        }
        // console.log(mentions)
      }
    }
  }
});

client.login(process.env.TOKEN);