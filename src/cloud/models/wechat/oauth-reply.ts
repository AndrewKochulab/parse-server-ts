import {Scope} from "../../we-chat.service";
import {ErrorReply} from "./error-reply";

export type OAuthReply = OAuthSuccess | ErrorReply

export interface OAuthSuccess{
    "access_token": string
    "expires_in": number
    "refresh_token": string
    "openid": string
    "scope": Scope
}

