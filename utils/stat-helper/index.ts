import { Processer } from './processer/index';
import { isValidScreenshot } from './comparer';
import { getPlayerDetails } from './formatter/index';
const fetch = require('node-fetch')

export class StatHelper {
  url: string;
  image: Buffer | undefined;
  constructor(url: string) {
    this.url = url;
    this.image = undefined;
  }

  async #fetchImage() {
    const resp = await fetch(this.url)
    const arrayBuffer = await resp.arrayBuffer()
    this.image = Buffer.from(arrayBuffer)
  }
  async isValid() { 
    if(!this.image) await this.#fetchImage()
    return await isValidScreenshot(this.image)
  }
  async getDetails() {
    if(!this.image) await this.#fetchImage()
    if (await this.isValid()) {
      const results = await new Processer(this.url).getText();
      // console.log(results)
      const details = getPlayerDetails(results);
      return details;
    }
    else {
      return false
    }
  }
}

// console.clear()
// const url = "https://cdn.discordapp.com/attachments/857359325949329439/861688362989781012/v2KJHPH.png";
// new StatHelper(url).getDetails().then(details => console.log(JSON.stringify(details, null, 2)))






