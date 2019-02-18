import { Message } from "discord.js";
import { BotCommandSettings } from "./BotCommandSettings";
import { DiscordBot } from "./DiscordBot";
import { GuildContext } from "./GuildContext";
export interface BotCommandExecutionContext {
    bot: DiscordBot;
    botCommand: BotCommand;
    message: Message;
    guildContext: GuildContext;
    settings: BotCommandSettings;
}
export declare type BotCommandAction = (BotCommandExecutionContext: any) => any;
export declare class BotCommand {
    private _keyword;
    private _description;
    private _action;
    constructor(keyword: string, description: string, action: BotCommandAction);
    execute(context: BotCommandExecutionContext): Promise<void>;
    readonly keyword: string;
    readonly description: string;
    readonly action: BotCommandAction;
    private isGranted;
}
