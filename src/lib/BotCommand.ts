import {Message} from "discord.js";
import {BotCommandSettings} from "./BotCommandSettings";
import {DiscordBot} from "./DiscordBot";
import {GuildContext} from "./GuildContext";
import {PermissionNames} from './PermissionNames';


export interface BotCommandExecutionContext {
    bot: DiscordBot;
    botCommand: BotCommand;
    message: Message;
    guildContext: GuildContext;
    settings: BotCommandSettings;
}

export type BotCommandAction = (BotCommandExecutionContext) => Promise<void>;

export class BotCommand {

    private _keyword: string;
    private _description: string;
    private _action: BotCommandAction;

    constructor(keyword: string, description: string, action: BotCommandAction) {
        this._keyword = keyword;
        this._description = description;
        this._action = action;
    }


    public async execute(context: BotCommandExecutionContext): Promise<void> {
        try{
            await this._action.call(this, context);
        }
        catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve();
    }


    get keyword(): string {
        return this._keyword;
    }

    get description(): string {
        return this._description;
    }

    get action(): BotCommandAction {
        return this._action;
    }

    private isGranted(message: Message, settings: BotCommandSettings): boolean{

        const perm = message.member.permissions;
        const roles = message.member.roles.keyArray();

        if (perm.has(PermissionNames.ADMINISTRATOR)){
            return true;
        }

        for (let i = 0; i < roles.length; i++){

            if (settings.isRoleGranted(roles[i])){
                return true;
            }

        }

        // TODO: manager per-user / per-channel grants here?

        return false;
    }


}
