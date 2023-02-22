const fs = require('fs'),
  PNG = require('pngjs').PNG,
  pixelmatch = require('pixelmatch'),
  sharp = require('sharp'),
  path = require('path');

export const isValidScreenshot = (image: string | Buffer, threshold: number = 250000): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    try {
      sharp(image)
        .resize(1280)
        .png()
        .toBuffer()
        .then(async (buffer) => {
          const TEST = PNG.sync.read(buffer),
            { width, height } = TEST,
            SAMPLE = PNG.sync.read(
              await sharp(
                fs.readFileSync(
                  path.resolve(__dirname, './SAMPLE.png')
                ))
                .resize(width, height)
                .toBuffer())
          const difference = pixelmatch(TEST.data, SAMPLE.data, null, width, height, { threshold: 0.1 });
          // console.log(`${image}: ${difference} pixels difference`)
          if (difference < threshold) { // probably a legitimate screenshot
            resolve(true)
          }
          resolve(false)
        })
        .catch(error => { // failure
          console.log('This error was caught in comparer/index.ts ↓');
          console.error(error);
          resolve(false)
        })
    }
    catch (error) { // failure
      resolve(false)
    }
  })
}

// Tests
// console.clear()
// async function test() {
//   for (let i = 1; i <= 10; i++) {
//     const img = `${__dirname}\\samples\\i${i}.jpeg`
//     const resp = await isValidScreenshot(img)
//     console.log(resp)
//     i !== 9 ? console.assert(resp) : console.assert(!resp)
//   }
// }
// test() // no output on success




module.exports = {
  isValidScreenshot
}





