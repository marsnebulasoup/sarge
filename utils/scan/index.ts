import { addDetails } from './../storage/index';
import { StatHelper } from "../stat-helper";
import StatsEmbed from "../embed";

const extensions = ["JPEG", "JPG", "PNG", "WEBP", "AVIF", "TIFF", "GIF", "SVG"];

export const Scan = (message) => {
  for (let attachment of message.attachments) {
    const fileExtension = attachment[1].name.split('.').reverse()[0].toUpperCase()
    if (extensions.includes(fileExtension)) {
      const url = attachment[1].proxyURL;
      message.delete()
      message.channel.send(`**⏳ Processing your screenshot ${message.author}...**`).then(processing_msg => {
        new StatHelper(url).getDetails().then(details => {
          if (!details) {
            processing_msg.delete()
            message.channel.send('**👎 That screenshot was invalid. Please try again.** *This message will disappear in 10 seconds*').then(invalid_img_msg => {
              invalid_img_msg.delete({ timeout: '10000' })
            });

            return
          }
          const statsEmbed = new StatsEmbed(message.author, details, url).embed
          processing_msg.delete()
          message.channel.send(statsEmbed)
          addDetails({
            user: message.author,
            details: details,
            screenshot_url: url
          })
        })
      })
    }
  }
}