import { Snowflake } from "discord.js";
import { BotCommand } from './BotCommand';
export declare class BotCommandSettings {
    private _command;
    private _allowedRoles;
    constructor(command: BotCommand);
    grantRole(roleId: Snowflake, grant?: boolean): void;
    isRoleGranted(roleId: Snowflake): boolean;
    readonly allowedRoles: Set<Snowflake>;
}
