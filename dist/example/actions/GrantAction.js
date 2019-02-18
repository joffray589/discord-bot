"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantAction = function (grant) {
    return function (context) {
        var message = context.message;
        var args = message.content.split(" ");
        var cmdName = args[1] || "";
        var commandSettings = context.guildContext.getCommandSettings(cmdName);
        if (commandSettings) {
            message.mentions.roles.forEach(function (role) {
                commandSettings.grantRole(role.id, grant);
            });
        }
    };
};
//# sourceMappingURL=GrantAction.js.map