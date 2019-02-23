import { Snowflake } from "discord.js";
import { BotCommand } from './BotCommand';
export declare class BotCommandSettings {
    private _command;
    private _allowedRoles;
    constructor(command: BotCommand);
    grantRole(roleId: Snowflake, grant?: boolean): void;
    isRoleGranted(roleId: Snowflake): boolean;
    readonly command: BotCommand;
    readonly allowedRoles: Set<Snowflake>;
}
