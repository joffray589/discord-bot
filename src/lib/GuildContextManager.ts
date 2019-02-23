import {Snowflake} from "discord.js";
import {GuildContext} from './GuildContext';
import {DiscordBot} from './DiscordBot';
import {BotCommandSettings} from './BotCommandSettings';


export interface GuildContextManager{

    bot() : DiscordBot;
    addGuildContext(guildId: Snowflake, context: GuildContext): Promise<void>;
    removeGuildContext(guildId: Snowflake): Promise<void>;
    loadGuildContext(guildId: Snowflake): Promise<GuildContext>;

    getCommandSetting(guildId: Snowflake, commandKeyword: string): Promise<BotCommandSettings>;


}