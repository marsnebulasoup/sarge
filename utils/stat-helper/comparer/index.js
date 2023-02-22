"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidScreenshot = void 0;
const fs = require('fs'), PNG = require('pngjs').PNG, pixelmatch = require('pixelmatch'), sharp = require('sharp'), path = require('path');
const isValidScreenshot = (image, threshold = 250000) => {
    return new Promise((resolve) => {
        try {
            sharp(image)
                .resize(1280)
                .png()
                .toBuffer()
                .then((buffer) => __awaiter(void 0, void 0, void 0, function* () {
                const TEST = PNG.sync.read(buffer), { width, height } = TEST, SAMPLE = PNG.sync.read(yield sharp(fs.readFileSync(path.resolve(__dirname, './SAMPLE.png')))
                    .resize(width, height)
                    .toBuffer());
                const difference = pixelmatch(TEST.data, SAMPLE.data, null, width, height, { threshold: 0.1 });
                // console.log(`${image}: ${difference} pixels difference`)
                if (difference < threshold) { // probably a legitimate screenshot
                    resolve(true);
                }
                resolve(false);
            }))
                .catch(error => {
                console.log('This error was caught in comparer/index.ts ↓');
                console.error(error);
                resolve(false);
            });
        }
        catch (error) { // failure
            resolve(false);
        }
    });
};
exports.isValidScreenshot = isValidScreenshot;
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
    isValidScreenshot: exports.isValidScreenshot
};
//# sourceMappingURL=index.js.map