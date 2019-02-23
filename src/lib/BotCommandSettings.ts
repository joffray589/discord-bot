import {Snowflake} from "discord.js";
import {BotCommand} from './BotCommand';


export class BotCommandSettings {

    private _command: BotCommand;

    private _allowedRoles: Set<Snowflake>;
    private _allowedChannels: Set<Snowflake>;

    constructor(command: BotCommand){
        this._allowedRoles = new Set<Snowflake>();
        this._allowedChannels = new Set<Snowflake>();
    }


    public grantRole(roleId: Snowflake, grant: boolean = true){
        if (grant){
            this._allowedRoles.add(roleId);
        }
        else{
            this._allowedRoles.delete(roleId);
        }
    }

    public isRoleGranted(roleId: Snowflake): boolean {
        return this._allowedRoles.has(roleId);
    }

    public grantChannel(channelId: Snowflake, grant: boolean = true){
        if (grant){
            this._allowedChannels.add(channelId);
        }
        else{
            this._allowedChannels.delete(channelId);
        }
    }

    public isChannelGranted(channelId: Snowflake): boolean {
        return this._allowedChannels.has(channelId);
    }

    get command(): BotCommand {
        return this._command;
    }

    get allowedRoles(): Set<Snowflake> {
        return this._allowedRoles;
    }

}