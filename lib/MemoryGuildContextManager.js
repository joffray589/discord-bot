"use strict";
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
    return MemoryGuildContextManager;
}());
exports.MemoryGuildContextManager = MemoryGuildContextManager;
//# sourceMappingURL=MemoryGuildContextManager.js.map