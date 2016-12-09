
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {OAuthReply} from "../models/wechat/oauth-reply";
import {WechatCommonService} from "./wechat-common.service";

export class OAuthService extends WechatCommonService{
    public serviceType:"oauth"
    constructor(){
        super("oauth")
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

export const oauthService = new OAuthService()