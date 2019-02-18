import { Snowflake } from "discord.js";
export declare class BotCommandSettings {
    private _allowedRoles;
    constructor();
    grantRole(roleId: Snowflake, grant?: boolean): void;
    isRoleGranted(roleId: Snowflake): boolean;
    readonly allowedRoles: Set<Snowflake>;
}
