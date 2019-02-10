import {BotCommand} from "../lib/BotCommand";
import {DiscordBot} from "../lib/DiscordBot";
import {MemGuildContextManager} from "./MemGuildContextManager";

const config = require("../../config.json");

const bot = new DiscordBot();

bot.guildContextManager = new MemGuildContextManager();

bot.login(config.bot.token, "JoBot2")
    .then(() => {
        bot.addCommand(new BotCommand("ping", "ping", (context): Promise<void> => {
            context.message.reply("pong");
            return Promise.resolve();
        }));

        bot.listen();
    })
    .catch((error) => {

    });



