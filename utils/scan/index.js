"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scan = void 0;
const index_1 = require("./../storage/index");
const stat_helper_1 = require("../stat-helper");
const embed_1 = require("../embed");
const extensions = ["JPEG", "JPG", "PNG", "WEBP", "AVIF", "TIFF", "GIF", "SVG"];
const Scan = (message) => {
    for (let attachment of message.attachments) {
        const fileExtension = attachment[1].name.split('.').reverse()[0].toUpperCase();
        if (extensions.includes(fileExtension)) {
            const url = attachment[1].proxyURL;
            message.delete();
            message.channel.send(`**⏳ Processing your screenshot ${message.author}...**`).then(processing_msg => {
                new stat_helper_1.StatHelper(url).getDetails().then(details => {
                    if (!details) {
                        processing_msg.delete();
                        message.channel.send('**👎 That screenshot was invalid. Please try again.** *This message will disappear in 10 seconds*').then(invalid_img_msg => {
                            invalid_img_msg.delete({ timeout: '10000' });
                        });
                        return;
                    }
                    const statsEmbed = new embed_1.default(message.author, details, url).embed;
                    processing_msg.delete();
                    message.channel.send(statsEmbed);
                    index_1.addDetails({
                        user: message.author,
                        details: details,
                        screenshot_url: url
                    });
                });
            });
        }
    }
};
exports.Scan = Scan;
//# sourceMappingURL=index.js.map