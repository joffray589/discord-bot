import {Snowflake} from "discord.js";


export class BotCommandSettings {

    private _allowedRoles: Set<Snowflake>;

    constructor(){
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

    get allowedRoles(): Set<Snowflake> {
        return this._allowedRoles;
    }

}