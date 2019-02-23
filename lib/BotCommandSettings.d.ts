import { Snowflake } from "discord.js";
import { BotCommand } from './BotCommand';
export declare class BotCommandSettings {
    private _command;
    private _allowedRoles;
    private _allowedChannels;
    constructor(command: BotCommand);
    grantRole(roleId: Snowflake, grant?: boolean): void;
    isRoleGranted(roleId: Snowflake): boolean;
    grantChannel(channelId: Snowflake, grant?: boolean): void;
    isChannelGranted(channelId: Snowflake): boolean;
    readonly command: BotCommand;
    readonly allowedRoles: Set<Snowflake>;
    readonly allowedChannels: Set<Snowflake>;
}
