import {BotCommandExecutionContext} from "../../lib/BotCommand";


export let grantAction = (grant: boolean) => {
    return (context: BotCommandExecutionContext): void => {

        const message   = context.message;
        const args      = message.content.split(" ");
        const cmdName   = args[1] || "";

        const commandSettings = context.guildContext.getCommandSettings(cmdName);

        if (commandSettings){
            message.mentions.roles.forEach(role => {
                commandSettings.grantRole(role.id, grant);
            });
        }

    };
}

