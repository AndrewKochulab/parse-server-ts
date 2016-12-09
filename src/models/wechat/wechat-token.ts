
export class WeChatToken extends Parse.Object{
    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super("WeChatToken");
        // All other initialization
    }
    tokenType:"wechat"
    openid:string
    image?:string
    user:Parse.User

    static newToken(openid:string, user: Parse.User){
        let nt = new WeChatToken()
        nt.openid = openid
        nt.user = user
    }
}

Parse.Object.registerSubclass("WeChatToken",WeChatToken)