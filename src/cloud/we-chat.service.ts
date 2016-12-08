
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

        return Observable.create((ob)=>{
            Parse.Cloud.httpRequest({url:url}).then((d) => ob.next(d),(e)=> ob.error(e))
        }).map(res => {
            return res.data
        });
    }

}

export const weChatService = new WeChatService()