
import {CommonService} from "./common-service";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {OAuthReply} from "./models/wechat/oauth-reply";

export type Scope = "snsapi_base" | "snsapi_userinfo";

class WeChatService extends CommonService{

    constructor(){
        super("app:service:wechat")
    }

    oauthLogin(code:string): Observable<OAuthReply>{
        this.logger(code)
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${environment.wechat.appid}&secret=${environment.wechat.appsecret}&code=${code}&grant_type=authorization_code`
        return Observable.fromPromise(Parse.Cloud.httpRequest({url:url})).map(res => {
            return res.data
        });
    }

}

export const weChatService = new WeChatService()