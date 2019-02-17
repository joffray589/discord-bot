import {BotCommandExecutionContext} from "../../lib/BotCommand";

export let pingAction = (context: BotCommandExecutionContext): void => {
    context.message.reply("pong");
}