import { Snowflake, VoiceConnection } from "discord.js";
import { BotCommandSettings } from "./BotCommandSettings";
import { ReactionListener } from "./ReactionListener";
export declare class GuildContext {
    private _guildId;
    private _commandPrefix;
    private _enabledCommands;
    private _commandSettings;
    private _voiceConnections;
    private _reactionListeners;
    constructor(guildId: Snowflake, commandPrefix: string);
    readonly guildId: Snowflake;
    commandPrefix: string;
    isCommandEnabled(keyword: string): boolean;
    enableCommand(keyword: string): void;
    disableCommand(keyword: string): void;
    setCommandSetting(keyword: string, settings: BotCommandSettings): void;
    getCommandSettings(keyword: string): BotCommandSettings;
    getVoiceConnection(channelId: Snowflake): VoiceConnection;
    addVoiceConnection(connection: VoiceConnection): void;
    removeVoiceConnection(channelId: Snowflake): void;
    getReactionListener(messageId: string): ReactionListener;
    addReactionListener(listener: ReactionListener): void;
    removeReactionListener(listener: ReactionListener): void;
}
