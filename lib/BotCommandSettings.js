"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BotCommandSettings = /** @class */ (function () {
    function BotCommandSettings(command) {
        this._allowedRoles = new Set();
        this._allowedChannels = new Set();
    }
    BotCommandSettings.prototype.grantRole = function (roleId, grant) {
        if (grant === void 0) { grant = true; }
        if (grant) {
            this._allowedRoles.add(roleId);
        }
        else {
            this._allowedRoles.delete(roleId);
        }
    };
    BotCommandSettings.prototype.isRoleGranted = function (roleId) {
        return this._allowedRoles.has(roleId);
    };
    BotCommandSettings.prototype.grantChannel = function (channelId, grant) {
        if (grant === void 0) { grant = true; }
        if (grant) {
            this._allowedChannels.add(channelId);
        }
        else {
            this._allowedChannels.delete(channelId);
        }
    };
    BotCommandSettings.prototype.isChannelGranted = function (channelId) {
        return this._allowedChannels.has(channelId);
    };
    Object.defineProperty(BotCommandSettings.prototype, "command", {
        get: function () {
            return this._command;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BotCommandSettings.prototype, "allowedRoles", {
        get: function () {
            return this._allowedRoles;
        },
        enumerable: true,
        configurable: true
    });
    return BotCommandSettings;
}());
exports.BotCommandSettings = BotCommandSettings;
//# sourceMappingURL=BotCommandSettings.js.map