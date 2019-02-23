"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PermissionNames_1 = require("./PermissionNames");
var BotCommand = /** @class */ (function () {
    function BotCommand(keyword, description, action) {
        this._keyword = keyword;
        this._description = description;
        this._action = action;
    }
    BotCommand.prototype.execute = function (context) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isGranted(context)) {
                try {
                    _this._action.call(_this, context);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            }
            else {
                context.message.reply("Sorry, you are not allowed to use this command");
                resolve();
            }
        });
    };
    Object.defineProperty(BotCommand.prototype, "keyword", {
        get: function () {
            return this._keyword;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BotCommand.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BotCommand.prototype, "action", {
        get: function () {
            return this._action;
        },
        enumerable: true,
        configurable: true
    });
    BotCommand.prototype.isGranted = function (context) {
        var perm = context.message.member.permissions;
        if (perm && perm.has(PermissionNames_1.PermissionNames.ADMINISTRATOR)) {
            return true;
        }
        if (context.settings) {
            var roles = context.message.member.roles.keyArray();
            for (var i = 0; i < roles.length; i++) {
                if (context.settings.isRoleGranted(roles[i])) {
                    return true;
                }
            }
            if (context.settings.isChannelGranted(context.message.channel.id)) {
                return true;
            }
        }
        // TODO: manager per-user / per-channel grants here?
        return false;
    };
    return BotCommand;
}());
exports.BotCommand = BotCommand;
//# sourceMappingURL=BotCommand.js.map