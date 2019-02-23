import { Client, Snowflake } from 'discord.js';
import { BotCommand } from './BotCommand';
import { EventEmitter } from "events";
import { GuildContextManager } from "./GuildContextManager";
export declare class DiscordBot extends EventEmitter {
    /**
     * client provided by the discord.js module
     * */
    private _client;
    /**
     * loaded commands map
     */
    private _commandsMap;
    private _guildContextManager;
    private _ignoredChannels;
    constructor();
    addCommand(command: BotCommand): void;
    setActivity(activity: string): void;
    getCommand(keyword: string): BotCommand;
    guildContextManager: GuildContextManager;
    readonly client: Client;
    readonly commandsMap: Map<string, BotCommand>;
    readonly ignoredChannels: Set<Snowflake>;
    login(token: string, activity?: string): Promise<void>;
    private error;
    listen(): void;
    /**
     * Here to try to prevent the loadGuilContext call
     * @param message : received message
     */
    private ignoreMessage;
}
