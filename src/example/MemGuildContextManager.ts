import {GuildContextManager} from '../lib/GuildContextManager';
import {Snowflake} from 'discord.js';
import {GuildContext} from '../lib/GuildContext';
import {DiscordBot} from '../lib/DiscordBot';


export class MemGuildContextManager implements GuildContextManager{

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
            this._storage.set(guildId, new GuildContext(guildId, "!"));
        }

        return Promise.resolve(this._storage.get(guildId));
    }


}