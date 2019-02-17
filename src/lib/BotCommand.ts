import {Message} from "discord.js";
import {BotCommandSettings} from "./BotCommandSettings";
import {DiscordBot} from "./DiscordBot";
import {GuildContext} from "./GuildContext";
import {PermissionNames} from "./PermissionNames";


export interface BotCommandExecutionContext {
    bot: DiscordBot;
    botCommand: BotCommand;
    message: Message;
    guildContext: GuildContext;
    settings: BotCommandSettings;
}

export type BotCommandAction = (BotCommandExecutionContext) => any;

export class BotCommand {

    private _keyword: string;
    private _description: string;
    private _action: BotCommandAction;

    constructor(keyword: string, description: string, action: BotCommandAction) {
        this._keyword = keyword;
        this._description = description;
        this._action = action;
    }


    public execute(context: BotCommandExecutionContext): Promise<void> {

        return new Promise<void>((resolve, reject) => {

            if (this.isGranted(context)){
                try{
                    this._action.call(this, context);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }

            }
            else{
                context.message.reply("Sorry, you are not allowed to use this command");
                resolve();
            }

        });

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

    private isGranted(context: BotCommandExecutionContext): boolean {


        const perm = context.message.member.permissions;

        if (perm && perm.has(PermissionNames.ADMINISTRATOR)){
            return true;
        }

        if (context.settings){
            const roles = context.message.member.roles.keyArray();

            for (let i = 0; i < roles.length; i++){

                if (context.settings.isRoleGranted(roles[i])){
                    return true;
                }

            }
        }

        // TODO: manager per-user / per-channel grants here?
        return false;
    }


}
