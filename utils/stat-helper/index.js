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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StatHelper_instances, _StatHelper_fetchImage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatHelper = void 0;
const index_1 = require("./processer/index");
const comparer_1 = require("./comparer");
const index_2 = require("./formatter/index");
const fetch = require('node-fetch');
class StatHelper {
    constructor(url) {
        _StatHelper_instances.add(this);
        this.url = url;
        this.image = undefined;
    }
    isValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.image)
                yield __classPrivateFieldGet(this, _StatHelper_instances, "m", _StatHelper_fetchImage).call(this);
            return yield comparer_1.isValidScreenshot(this.image);
        });
    }
    getDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.image)
                yield __classPrivateFieldGet(this, _StatHelper_instances, "m", _StatHelper_fetchImage).call(this);
            if (yield this.isValid()) {
                const results = yield new index_1.Processer(this.url).getText();
                // console.log(results)
                const details = index_2.getPlayerDetails(results);
                return details;
            }
            else {
                return false;
            }
        });
    }
}
exports.StatHelper = StatHelper;
_StatHelper_instances = new WeakSet(), _StatHelper_fetchImage = function _StatHelper_fetchImage() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(this.url);
        const arrayBuffer = yield resp.arrayBuffer();
        this.image = Buffer.from(arrayBuffer);
    });
};
// console.clear()
// const url = "https://cdn.discordapp.com/attachments/857359325949329439/861688362989781012/v2KJHPH.png";
// new StatHelper(url).getDetails().then(details => console.log(JSON.stringify(details, null, 2)))
//# sourceMappingURL=index.js.map