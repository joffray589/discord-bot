"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var events_1 = require("events");
var MemoryGuildContextManager_1 = require("./MemoryGuildContextManager");
var DiscordBot = /** @class */ (function (_super) {
    __extends(DiscordBot, _super);
    function DiscordBot() {
        var _this = _super.call(this) || this;
        _this._client = new discord_js_1.Client();
        _this._commandsMap = new Map();
        _this._ignoredChannels = new Set();
        _this._guildContextManager = new MemoryGuildContextManager_1.MemoryGuildContextManager(_this);
        return _this;
    }
    DiscordBot.prototype.addCommand = function (command) {
        if (!command.keyword || command.keyword === "") {
            throw new Error("DiscordBot.addCommand() : Command keyword must be defined");
        }
        if (this._commandsMap.get(command.keyword)) {
            throw new Error("DiscordBot.addCommand() : Command + " + command.keyword + " already defined");
        }
        this._commandsMap.set(command.keyword, command);
    };
    DiscordBot.prototype.setActivity = function (activity) {
        this._client.user.setActivity(activity);
    };
    DiscordBot.prototype.getCommand = function (keyword) {
        return this._commandsMap.get(keyword);
    };
    Object.defineProperty(DiscordBot.prototype, "guildContextManager", {
        get: function () {
            return this._guildContextManager;
        },
        set: function (value) {
            this._guildContextManager = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscordBot.prototype, "client", {
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscordBot.prototype, "commandsMap", {
        get: function () {
            return this._commandsMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscordBot.prototype, "ignoredChannels", {
        get: function () {
            return this._ignoredChannels;
        },
        enumerable: true,
        configurable: true
    });
    DiscordBot.prototype.login = function (token, activity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._client.login(token)
                .then(function () {
                if (activity) {
                    _this.setActivity(activity);
                }
                resolve();
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DiscordBot.prototype.listen = function () {
        var _this = this;
        this._client.on("message", function (message) {
            if (!_this.ignoreMessage(message)) {
                //console.log("Received message from " + message.author.username + " on channel " + message.channel.id);
                //console.log(message.content);
                //console.log("-----");
                _this._guildContextManager
                    .loadGuildContext(message.guild.id)
                    .then(function (guildContext) {
                    var commandPrefix = guildContext.commandPrefix;
                    if (!message.author.bot && message.content.startsWith(commandPrefix)) {
                        var keyword = message.content.split(" ")[0] || "";
                        if (keyword && keyword !== "") {
                            keyword = keyword.substring(commandPrefix.length);
                            var command = _this.getCommand(keyword);
                            if (command) {
                                var settings = guildContext.getCommandSettings(keyword);
                                if (settings) {
                                    var context = {
                                        bot: _this,
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
                    .catch(function (error) {
                    console.log("Load guild context error : " + error);
                });
            }
        });
        this._client.on("messageReactionAdd", function (reaction, user) {
            _this._guildContextManager.loadGuildContext(reaction.message.guild.id)
                .then(function (context) {
                var listener = context.getReactionListener(reaction.message.id);
                if (listener) {
                    if (listener.onAdd) {
                        listener.onAdd(reaction, user);
                    }
                }
            })
                .catch(function (error) {
                console.log("Load guild context error : " + error);
            });
        });
        this._client.on("messageReactionRemove", function (reaction, user) {
            _this._guildContextManager.loadGuildContext(reaction.message.guild.id)
                .then(function (context) {
                var listener = context.getReactionListener(reaction.message.id);
                if (listener) {
                    if (listener.onRemove) {
                        listener.onRemove(reaction, user);
                    }
                }
            })
                .catch(function (error) {
                console.log("Load guild context error : " + error);
            });
        });
        this._client.on("messageReactionRemoveAll", function (message) {
            _this._guildContextManager.loadGuildContext(message.guild.id)
                .then(function (context) {
                var listener = context.getReactionListener(message.id);
                if (listener) {
                    if (listener.onRemoveAll) {
                        listener.onRemoveAll(message);
                    }
                }
            })
                .catch(function (error) {
                console.log("Load guild context error : " + error);
            });
        });
    };
    /**
     * Here to try to prevent the loadGuilContext call
     * @param message : received message
     */
    DiscordBot.prototype.ignoreMessage = function (message) {
        // TODO : delete this condition...
        if (message.channel.id === "537693096180318238") {
            return true;
        }
        if (message.author.bot) {
            return true;
        }
        // TODO : allow the bot to ignore channels here
        if (this._ignoredChannels.has(message.channel.id)) {
            return true;
        }
        // TODO : create a command prefix set and check if the message start with an existing prefix
        // TODO : add spam prevention here
        return false;
    };
    return DiscordBot;
}(events_1.EventEmitter));
exports.DiscordBot = DiscordBot;
//# sourceMappingURL=DiscordBot.js.map