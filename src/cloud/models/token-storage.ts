
import {WeChatToken} from "./wechat/wechat-token";
export interface OtherToken{
    other:string
}

export type TokenStorageType = OtherToken | WeChatToken