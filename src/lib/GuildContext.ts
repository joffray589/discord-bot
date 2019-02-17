import {Snowflake, VoiceConnection} from "discord.js";
import {BotCommandSettings} from "./BotCommandSettings";
import {ReactionListener} from "./ReactionListener";


export class GuildContext {

    private _guildId: Snowflake;
    private _commandPrefix: string;
    private _enabledCommands: Set<string>;
    private _commandSettings: Map<string, BotCommandSettings>;

    private _voiceConnections: Map<string, VoiceConnection>;
    private _reactionListeners: Map<Snowflake, ReactionListener>;

    constructor(guildId: Snowflake, commandPrefix: string){
        this._guildId = guildId;
        this._commandPrefix = commandPrefix;
        this._enabledCommands = new Set<string>();
        this._commandSettings = new Map<string, BotCommandSettings>();
        this._voiceConnections = new Map<string, VoiceConnection>();
        this._reactionListeners = new Map<Snowflake, ReactionListener>();
    }


    get guildId(): Snowflake {
        return this._guildId;
    }

    get commandPrefix(): string {
        return this._commandPrefix;
    }

    set commandPrefix(value: string) {
        this._commandPrefix = value;
    }

    public isCommandEnabled(keyword: string): boolean{
        return this._enabledCommands.has(keyword);
    }

    public enableCommand(keyword: string){
        this._enabledCommands.add(keyword);
    }

    public disableCommand(keyword: string){
        this._enabledCommands.delete(keyword);
    }

    public setCommandSetting(keyword: string, settings: BotCommandSettings){
        this._commandSettings.set(keyword, settings);
    }

    public getCommandSettings(keyword: string): BotCommandSettings{
        return this._commandSettings.get(keyword);
    }


    public getVoiceConnection(channelId: Snowflake): VoiceConnection{
        return this._voiceConnections.get(channelId);
    }

    public addVoiceConnection(connection: VoiceConnection){
        this._voiceConnections.set(connection.channel.id, connection);
    }

    public removeVoiceConnection(channelId: Snowflake){
        this._voiceConnections.delete(channelId);
    }

    public getReactionListener(messageId: string): ReactionListener{
        return this._reactionListeners.get(messageId);
    }

    public addReactionListener(listener: ReactionListener){
        this._reactionListeners.set(listener.message.id, listener);
    }

    public removeReactionListener(listener: ReactionListener){
        this._reactionListeners.delete(listener.message.id);
    }

}
