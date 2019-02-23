"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BotCommandSettings = /** @class */ (function () {
    function BotCommandSettings(command) {
        this._allowedRoles = new Set();
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