import { Message, MessageReaction, User } from "discord.js";
export interface ReactionListenerOptions {
    onAdd: (reaction: MessageReaction, user: User) => any;
    onRemove?: (reaction: MessageReaction, user: User) => any;
    onRemoveAll?: (message: Message) => any;
}
export declare class ReactionListener {
    private _message;
    private _onAdd;
    private _onRemove;
    private _onRemoveAll;
    constructor(message: Message, options: ReactionListenerOptions);
    readonly message: Message;
    readonly onAdd: (reaction: MessageReaction, user: User) => any;
    readonly onRemove: (reaction: MessageReaction, user: User) => any;
    readonly onRemoveAll: (message: Message) => any;
}
