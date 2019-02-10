import {Client, Message} from "discord.js";
import {BotCommand} from "./BotCommand";

import {EventEmitter} from "events";
import {GuildContextManager} from "./GuildContextManager";


export class DiscordBot extends EventEmitter{

    /**
     * client provided by the discord.js module
     * */
    private _client: Client;

    /**
     * loaded commands map
     */
    private _commandsMap: Map<string, BotCommand>;

    private _guildContextManager: GuildContextManager;


    constructor() {
        super();
        this._client = new Client();
        this._commandsMap = new Map<string, BotCommand>();
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

    public listen(){

        this._client.on("message", (message: Message) => {

            // console.log("Received message from " + message.author.username);
            // console.log(message.content);
            // console.log("-----");

            this._guildContextManager.loadGuildContext(message.guild.id)
                .then((guildContext) => {
                    const commandPrefix = guildContext.commandPrefix;

                    if (!message.author.bot && message.content.startsWith(commandPrefix)){

                        let keyword = message.content.split(" ")[0] || "";

                        if (keyword && keyword !== ""){
                            keyword = keyword.substring(commandPrefix.length);
                            const botCommand = this.getCommand(keyword);
                            const settings = guildContext.getCommandSettings(keyword);
                            const bot = this;
                            if (botCommand){
                                botCommand.execute({ bot, botCommand, message, guildContext, settings });
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.log("Load guild context error : " + error);
                });

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


}
