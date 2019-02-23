import {BotCommand} from "../lib/BotCommand";
import {DiscordBot} from "../lib/DiscordBot";
import {pingAction} from "./actions/PingAction";
import {grantAction} from "./actions/GrantAction";
import {MemoryGuildContextManager} from "../lib/MemoryGuildContextManager";

const config = require("../config.json");

process.on("uncaughtException", (err) => {
    // handle the error safely
    console.log("############ uncaughtException");
    console.log(err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", reason.stack || reason);
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
});

(async () => {

    try{
        const bot = new DiscordBot();

        bot.guildContextManager = new MemoryGuildContextManager(bot);

        await bot.login(config.bot.token, "PingBot");
        bot.addCommand(new BotCommand("ping", "ping", pingAction));
        bot.addCommand(new BotCommand("grant", "grant", grantAction(true)));
        bot.addCommand(new BotCommand("ungrant", "ungrant", grantAction(false)));

        bot.listen();
        console.log("Bot ready");
    }
    catch(e){
        console.log(e);
    }

})();

