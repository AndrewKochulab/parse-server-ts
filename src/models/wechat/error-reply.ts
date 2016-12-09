import {OAuthSuccess} from "./oauth-reply";
export interface ErrorReply {
    "errcode":number
    "errmsg":string
}

export function isError(obj: OAuthSuccess | ErrorReply): obj is ErrorReply {
    return (<ErrorReply>obj).errcode !== undefined;
}