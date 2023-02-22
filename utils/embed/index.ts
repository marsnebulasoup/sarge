import { rankInsignias } from '../stat-helper/ranks/ranks';
import { PlayerDetails } from '../stat-helper/formatter/index';
const Discord = require('discord.js');

export default class StatsEmbed {
  user: any
  details: PlayerDetails
  screenshot_url: any;
  rank: string;
  matches: string | number;
  wins: string | number;
  kills: string | number;
  deaths: string | number;
  win_ratio: string | number;
  kill_to_death_ratio: string | number;
  av_amt_of_kills_per_match: string | number;
  av_amt_of_deaths_per_match: string | number;
  constructor(user, details: PlayerDetails, url: string) {
    this.user = user;
    this.details = details;
    this.screenshot_url = url;
    this.rank = details.rank;
    this.matches = details.matches || '-';
    this.wins = details.wins || '-';
    this.kills = details.kills || '-';
    this.deaths = details.deaths || '-';
    this.win_ratio = details.matches ? (details.wins / details.matches * 100).toFixed(2) : '-'
    this.kill_to_death_ratio = details.deaths ? this.#getRatio(details.kills, details.deaths) : '-'
    this.av_amt_of_kills_per_match = details.matches ? (details.kills / details.matches).toFixed(0) : '-'
    this.av_amt_of_deaths_per_match = details.matches ? (details.deaths / details.matches).toFixed(0) : '-'
  }

  get embed() {
    console.log(`SS url: ${this.screenshot_url}$`)
    return new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${this.user.username}'s Stats`)
      // .setThumbnail(this.user.displayAvatarURL({ format: 'png', dynamic: true }))
      .setThumbnail(rankInsignias[this.rank])
      .setDescription(`
      📛 Rank: \`${this.rank}\`\n\n
      
🔫 Matches: \`${this.matches}\`\n
🥇 Wins: \`${this.wins}\`\n
🔪 Kills: \`${this.kills}\`\n
💀 Deaths: \`${this.deaths}\`\n\n

🏆 Win Ratio: \`${this.win_ratio}%\`\n
:crossed_swords: Average Kills/Match: \`${this.av_amt_of_kills_per_match}\`\n
:coffin: Average Deaths/Match: \`${this.av_amt_of_deaths_per_match}\`\n
👌 Kills to Deaths Ratio: \`${this.kill_to_death_ratio}\`\n
      `)

      .setImage(this.screenshot_url)
      .setTimestamp()
      .setFooter('Processed by SARGE', 'https://i.imgur.com/qePvR7j.jpg');
  }

  #getRatio(a: number, b: number, tolerance = 0.8) { // thanks @TimDuggan: https://stackoverflow.com/a/47915852/8402369

    /*where a is the first number, b is the second number,  and tolerance is a percentage
    of allowable error expressed as a decimal. 753,4466,.08 = 1:6, 753,4466,.05 = 14:83,*/

    if (a > b) { var bg = a; var sm = b; } else { var bg = b; var sm = a; }
    for (var i = 1; i < 1000000; i++) {
      var d = sm / i;
      var res = bg / d;
      var howClose = Math.abs(res - Number(res.toFixed(0)));
      if (howClose < tolerance) {
        if (a > b) {
          return res.toFixed(0) + ':' + i;
        } else {
          return i + ':' + res.toFixed(0);
        }
      }
    }
  }

}