import {Client, Message, Snowflake} from 'discord.js';
import {BotCommand, BotCommandExecutionContext} from './BotCommand';

import {EventEmitter} from "events";
import {GuildContextManager} from "./GuildContextManager";
import {MemGuildContextManager} from "../example/MemGuildContextManager";

export class DiscordBot extends EventEmitter {

    /**
     * client provided by the discord.js module
     * */
    private _client: Client;

    /**
     * loaded commands map
     */
    private _commandsMap: Map<string, BotCommand>;

    private _guildContextManager: GuildContextManager;

    private _ignoredChannels: Set<Snowflake>;

    constructor() {
        super();
        this._client = new Client();
        this._commandsMap = new Map<string, BotCommand>();
        this._ignoredChannels = new Set<Snowflake>();
        this._guildContextManager = new MemGuildContextManager();
    }

    public addCommand(command: BotCommand){

        if (!command.keyword || command.keyword === ""){
            throw new Error("DiscordBot.addCommand() : Command keyword must be defined");
        }

        if (this._commandsMap.get(command.keyword)){
            throw new Error("DiscordBot.addCommand() : Command + "  + command.keyword + " already defined");
        }

        this._commandsMap.set(command.keyword, command);
    }

    public setActivity(activity: string){
        this._client.user.setActivity(activity);
    }

    public getCommand(keyword: string): BotCommand{
        return this._commandsMap.get(keyword);
    }

    get guildContextManager(): GuildContextManager {
        return this._guildContextManager;
    }

    set guildContextManager(value: GuildContextManager) {
        this._guildContextManager = value;
    }

    get client(): Client {
        return this._client;
    }

    get commandsMap(): Map<string, BotCommand> {
        return this._commandsMap;
    }

    public login(token: string, activity?: string): Promise<void> {

        return new Promise<void>((resolve, reject) => {

            this._client.login(token)
                .then(() => {
                    if (activity){
                        this.setActivity(activity);
                    }
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public listen(){

        this._client.on("message", (message: Message) => {

            if (!this.ignoreMessage(message)){
                console.log("Received message from " + message.author.username + " on channel " + message.channel.id);
                console.log(message.content);
                console.log("-----");

                this._guildContextManager.loadGuildContext(message.guild.id)
                    .then((guildContext) => {
                        const commandPrefix = guildContext.commandPrefix;

                        if (!message.author.bot && message.content.startsWith(commandPrefix)){

                            let keyword = message.content.split(" ")[0] || "";

                            if (keyword && keyword !== ""){
                                keyword = keyword.substring(commandPrefix.length);
                                const command = this.getCommand(keyword);

                                if (command){

                                    const settings = guildContext.getCommandSettings(keyword);

                                    if (settings){
                                        const context: BotCommandExecutionContext = {
                                            bot: this,
                                            botCommand: command,
                                            message: message,
                                            guildContext: guildContext,
                                            settings: settings
                                        };

                                        command.execute(context);
                                    }

                                }
                            }
                        }
                    })
                    .catch((error) => {
                        console.log("Load guild context error : " + error);
                    });
            }




        });

        this._client.on("messageReactionAdd", (reaction, user) => {

            this._guildContextManager.loadGuildContext(reaction.message.guild.id)
                .then((context) => {
                    const listener = context.getReactionListener(reaction.message.id);
                    if (listener){
                        if (listener.onAdd){
                            listener.onAdd(reaction, user);
                        }
                    }
                })
                .catch((error) => {
                    console.log("Load guild context error : " + error);
                });

        });

        this._client.on("messageReactionRemove", (reaction, user) => {

            this._guildContextManager.loadGuildContext(reaction.message.guild.id)
                .then((context) => {
                    const listener = context.getReactionListener(reaction.message.id);
                    if (listener){
                        if (listener.onRemove){
                            listener.onRemove(reaction, user);
                        }
                    }
                })
                .catch((error) => {
                    console.log("Load guild context error : " + error);
                });

        });

        this._client.on("messageReactionRemoveAll", (message) => {

            this._guildContextManager.loadGuildContext(message.guild.id)
                .then((context) => {
                    const listener = context.getReactionListener(message.id);
                    if (listener){
                        if (listener.onRemoveAll){
                            listener.onRemoveAll(message);
                        }
                    }
                })
                .catch((error) => {
                    console.log("Load guild context error : " + error);
                });

        });

    }


    /**
     * Here to try to prevent the loadGuilContext call
     * @param message : received message
     */
    private ignoreMessage(message: Message) : boolean{

        // TODO : delete this condition...
        if(message.channel.id === "537693096180318238"){
            return true;
        }

        if (message.author.bot){
            return true;
        }

        // TODO : allow the bot to ignore channels here
        if (this._ignoredChannels.has(message.channel.id)){
            return true;
        }

        // TODO : create a command prefix set and check if the message start with an existing prefix

        // TODO : add spam prevention here

        return false;
    }


}
