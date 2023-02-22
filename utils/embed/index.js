"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StatsEmbed_instances, _StatsEmbed_getRatio;
Object.defineProperty(exports, "__esModule", { value: true });
const ranks_1 = require("../stat-helper/ranks/ranks");
const Discord = require('discord.js');
class StatsEmbed {
    constructor(user, details, url) {
        _StatsEmbed_instances.add(this);
        this.user = user;
        this.details = details;
        this.screenshot_url = url;
        this.rank = details.rank;
        this.matches = details.matches || '-';
        this.wins = details.wins || '-';
        this.kills = details.kills || '-';
        this.deaths = details.deaths || '-';
        this.win_ratio = details.matches ? (details.wins / details.matches * 100).toFixed(2) : '-';
        this.kill_to_death_ratio = details.deaths ? __classPrivateFieldGet(this, _StatsEmbed_instances, "m", _StatsEmbed_getRatio).call(this, details.kills, details.deaths) : '-';
        this.av_amt_of_kills_per_match = details.matches ? (details.kills / details.matches).toFixed(0) : '-';
        this.av_amt_of_deaths_per_match = details.matches ? (details.deaths / details.matches).toFixed(0) : '-';
    }
    get embed() {
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${this.user.username}'s Stats`)
            // .setThumbnail(this.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setThumbnail(ranks_1.rankInsignias[this.rank])
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
}
exports.default = StatsEmbed;
_StatsEmbed_instances = new WeakSet(), _StatsEmbed_getRatio = function _StatsEmbed_getRatio(a, b, tolerance = 0.8) {
    /*where a is the first number, b is the second number,  and tolerance is a percentage
    of allowable error expressed as a decimal. 753,4466,.08 = 1:6, 753,4466,.05 = 14:83,*/
    if (a > b) {
        var bg = a;
        var sm = b;
    }
    else {
        var bg = b;
        var sm = a;
    }
    for (var i = 1; i < 1000000; i++) {
        var d = sm / i;
        var res = bg / d;
        var howClose = Math.abs(res - Number(res.toFixed(0)));
        if (howClose < tolerance) {
            if (a > b) {
                return res.toFixed(0) + ':' + i;
            }
            else {
                return i + ':' + res.toFixed(0);
            }
        }
    }
};
//# sourceMappingURL=index.js.map