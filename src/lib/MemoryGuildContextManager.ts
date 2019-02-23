import {GuildContextManager} from "./GuildContextManager";
import {Snowflake} from "discord.js";
import {GuildContext} from "./GuildContext";
import {DiscordBot} from "./DiscordBot";
import {BotCommandSettings} from "./BotCommandSettings";


export class MemoryGuildContextManager implements GuildContextManager{

    private _bot: DiscordBot;
    private _storage: Map<string, GuildContext>;

    constructor(bot: DiscordBot) {
        this._bot = bot;
        this._storage = new Map<string, GuildContext>();
    }

    public bot(): DiscordBot {
        return this._bot;
    }

    public addGuildContext(guildId: Snowflake, context: GuildContext): Promise<void> {
        this._storage.set(guildId, context);
        return Promise.resolve();
    }

    public removeGuildContext(guildId: Snowflake): Promise<void> {
        this._storage.delete(guildId);
        return Promise.resolve();
    }

    public loadGuildContext(guildId: Snowflake): Promise<GuildContext> {

        if (!this._storage.has(guildId)){

            const guildContext = new GuildContext(guildId, "!");

            this._bot.commandsMap.forEach(command => {
               guildContext.setCommandSetting(command.keyword, new BotCommandSettings(command));
            });

            this._storage.set(guildId, guildContext);
        }

        return Promise.resolve(this._storage.get(guildId));
    }

    public getCommandSetting(guildId: Snowflake, commandKeyword: string): Promise<BotCommandSettings> {

        if(this._storage.has(guildId) && this._storage.get(guildId).getCommandSettings(commandKeyword)){
            return Promise.resolve(this._storage.get(guildId).getCommandSettings(commandKeyword));
        }

        return Promise.reject("Unable to find command setting");

    }

    public async changeCommandPrefix(guildId: Snowflake, commandPrefix: string): Promise<void> {

        try{
            const context = await this.loadGuildContext(guildId);
            context.commandPrefix = commandPrefix;
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }

    }

}