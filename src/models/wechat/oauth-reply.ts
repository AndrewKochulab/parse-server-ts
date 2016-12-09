import {ErrorReply} from "./error-reply";

export type OAuthReply = OAuthSuccess | ErrorReply

export interface OAuthSuccess{
    "access_token": string
    "expires_in": number
    "refresh_token": string
    "openid": string
    "scope": Scope
}

export type Scope = "snsapi_base" | "snsapi_userinfo";