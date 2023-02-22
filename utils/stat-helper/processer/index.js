"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Processer_client;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processer = void 0;
const fs = require('fs');
const vision = require('@google-cloud/vision');
class Processer {
    constructor(url) {
        _Processer_client.set(this, void 0); // # makes it a private field
        this.url = url; // image url
        __classPrivateFieldSet(this, _Processer_client, new vision.ImageAnnotatorClient(), "f");
    }
    getText() {
        return new Promise(resolve => {
            // resolve(JSON.parse(fs.readFileSync(__dirname + "\\example.json")))
            __classPrivateFieldGet(this, _Processer_client, "f").textDetection(this.url).then(result => {
                try {
                    const results = result[0];
                    if (results.error) {
                        console.log('There was an error in (try block) ./processer/index.ts ↓');
                        console.error(results.error.message);
                    }
                    resolve(results);
                }
                catch (error) {
                    console.log('There was an error in (1st catch) ./processer/index.ts ↓');
                    console.error(error);
                    resolve({
                        textAnnotations: []
                    });
                }
            }).catch(error => {
                console.log('There was an error in (2nd catch) ./processer/index.ts ↓');
                console.error(error);
                resolve({
                    textAnnotations: [],
                });
            });
        });
    }
}
exports.Processer = Processer;
_Processer_client = new WeakMap();
//# sourceMappingURL=index.js.map