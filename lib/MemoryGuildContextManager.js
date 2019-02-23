"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GuildContext_1 = require("./GuildContext");
var BotCommandSettings_1 = require("./BotCommandSettings");
var MemoryGuildContextManager = /** @class */ (function () {
    function MemoryGuildContextManager(bot) {
        this._bot = bot;
        this._storage = new Map();
    }
    MemoryGuildContextManager.prototype.bot = function () {
        return this._bot;
    };
    MemoryGuildContextManager.prototype.addGuildContext = function (guildId, context) {
        this._storage.set(guildId, context);
        return Promise.resolve();
    };
    MemoryGuildContextManager.prototype.removeGuildContext = function (guildId) {
        this._storage.delete(guildId);
        return Promise.resolve();
    };
    MemoryGuildContextManager.prototype.loadGuildContext = function (guildId) {
        if (!this._storage.has(guildId)) {
            var guildContext_1 = new GuildContext_1.GuildContext(guildId, "!");
            this._bot.commandsMap.forEach(function (command) {
                guildContext_1.setCommandSetting(command.keyword, new BotCommandSettings_1.BotCommandSettings(command));
            });
            this._storage.set(guildId, guildContext_1);
        }
        return Promise.resolve(this._storage.get(guildId));
    };
    MemoryGuildContextManager.prototype.getCommandSetting = function (guildId, commandKeyword) {
        if (this._storage.has(guildId) && this._storage.get(guildId).getCommandSettings(commandKeyword)) {
            return Promise.resolve(this._storage.get(guildId).getCommandSettings(commandKeyword));
        }
        return Promise.reject("Unable to find command setting");
    };
    MemoryGuildContextManager.prototype.changeCommandPrefix = function (guildId, commandPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var context, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadGuildContext(guildId)];
                    case 1:
                        context = _a.sent();
                        context.commandPrefix = commandPrefix;
                        return [2 /*return*/, Promise.resolve()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MemoryGuildContextManager;
}());
exports.MemoryGuildContextManager = MemoryGuildContextManager;
//# sourceMappingURL=MemoryGuildContextManager.js.map