import {Message, MessageReaction, User} from "discord.js";


export interface ReactionListenerOptions{
    onAdd: (reaction: MessageReaction, user: User) => any;
    onRemove?: (reaction: MessageReaction, user: User) => any;
    onRemoveAll?: (message: Message) => any;
}

export class ReactionListener{

    private _message: Message;
    private _onAdd: (reaction: MessageReaction, user: User) => any;
    private _onRemove: (reaction: MessageReaction, user: User) => any;
    private _onRemoveAll: (message: Message) => any;

    constructor(message: Message, options: ReactionListenerOptions){
        this._message = message;
        this._onAdd = options.onAdd;
        this._onRemove = options.onRemove;
        this._onRemoveAll = options.onRemoveAll;
    }

    get message(): Message {
        return this._message;
    }

    get onAdd(): (reaction: MessageReaction, user: User) => any {
        return this._onAdd;
    }

    get onRemove(): (reaction: MessageReaction, user: User) => any {
        return this._onRemove;
    }

    get onRemoveAll(): (message: Message) => any {
        return this._onRemoveAll;
    }

}
