import { GuildContextManager } from "./GuildContextManager";
import { Snowflake } from "discord.js";
import { GuildContext } from "./GuildContext";
import { DiscordBot } from "./DiscordBot";
export declare class MemoryGuildContextManager implements GuildContextManager {
    private _bot;
    private _storage;
    constructor(bot: DiscordBot);
    bot(): DiscordBot;
    addGuildContext(guildId: Snowflake, context: GuildContext): Promise<void>;
    removeGuildContext(guildId: Snowflake): Promise<void>;
    loadGuildContext(guildId: Snowflake): Promise<GuildContext>;
}
