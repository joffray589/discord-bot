import {Snowflake} from "discord.js";
import {BotCommand} from './BotCommand';


export class BotCommandSettings {

    private _command: BotCommand;

    private _allowedRoles: Set<Snowflake>;

    constructor(command: BotCommand){
        this._allowedRoles = new Set<Snowflake>();
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

    get command(): BotCommand {
        return this._command;
    }

    get allowedRoles(): Set<Snowflake> {
        return this._allowedRoles;
    }

}