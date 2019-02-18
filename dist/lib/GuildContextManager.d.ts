import { Snowflake } from "discord.js";
import { GuildContext } from './GuildContext';
import { DiscordBot } from './DiscordBot';
export interface GuildContextManager {
    bot(): DiscordBot;
    addGuildContext(guildId: Snowflake, context: GuildContext): Promise<void>;
    removeGuildContext(guildId: Snowflake): Promise<void>;
    loadGuildContext(guildId: Snowflake): Promise<GuildContext>;
}
