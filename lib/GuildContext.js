"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GuildContext = /** @class */ (function () {
    function GuildContext(guildId, commandPrefix) {
        this._guildId = guildId;
        this._commandPrefix = commandPrefix;
        this._commandSettings = new Map();
        this._voiceConnections = new Map();
        this._reactionListeners = new Map();
    }
    Object.defineProperty(GuildContext.prototype, "guildId", {
        get: function () {
            return this._guildId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuildContext.prototype, "commandPrefix", {
        get: function () {
            return this._commandPrefix;
        },
        set: function (value) {
            this._commandPrefix = value;
        },
        enumerable: true,
        configurable: true
    });
    GuildContext.prototype.setCommandSetting = function (keyword, settings) {
        this._commandSettings.set(keyword, settings);
    };
    GuildContext.prototype.getCommandSettings = function (keyword) {
        return this._commandSettings.get(keyword);
    };
    GuildContext.prototype.getVoiceConnection = function (channelId) {
        return this._voiceConnections.get(channelId);
    };
    GuildContext.prototype.addVoiceConnection = function (connection) {
        this._voiceConnections.set(connection.channel.id, connection);
    };
    GuildContext.prototype.removeVoiceConnection = function (channelId) {
        this._voiceConnections.delete(channelId);
    };
    GuildContext.prototype.getReactionListener = function (messageId) {
        return this._reactionListeners.get(messageId);
    };
    GuildContext.prototype.addReactionListener = function (listener) {
        this._reactionListeners.set(listener.message.id, listener);
    };
    GuildContext.prototype.removeReactionListener = function (listener) {
        this._reactionListeners.delete(listener.message.id);
    };
    return GuildContext;
}());
exports.GuildContext = GuildContext;
//# sourceMappingURL=GuildContext.js.map