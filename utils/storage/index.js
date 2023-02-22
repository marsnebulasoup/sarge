"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetails = exports.addDetails = void 0;
const conf_1 = require("conf");
const verifySetup = () => {
    const config = new conf_1.default({ cwd: __dirname });
    config.has('playerinfo') || config.set('playerinfo', []);
};
const addDetails = (stats) => {
    verifySetup();
    const config = new conf_1.default({ cwd: __dirname });
    const existing = config.get('playerinfo');
    for (let i = 0; i < existing.length; i++) {
        if (existing[i].user.username === stats.user.username) {
            existing[i] = stats;
            // console.log(existing[i])
            config.set('playerinfo', existing);
            return;
        }
    }
    existing.push(stats);
    config.set('playerinfo', existing);
};
exports.addDetails = addDetails;
const getDetails = (user) => {
    verifySetup();
    const config = new conf_1.default({ cwd: __dirname });
    const existing = config.get('playerinfo');
    for (let stat of existing) {
        if (stat.user.username === user)
            return stat;
    }
    return false;
};
exports.getDetails = getDetails;
//# sourceMappingURL=index.js.map