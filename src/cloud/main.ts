import * as debug from "debug";
import {projectService} from "./project.service";
import {weChatService} from "./we-chat.service";
import {OAuthReply} from "./models/wechat/oauth-reply";
import {isError} from "./models/wechat/error-reply";
import {WeChatToken} from "./models/wechat/wechat-token";
const logger = debug("app:cloud")

Parse.Cloud.define('hello', (req, res) => {
    //Parse.User.signUp("user","password",{"test_attr":"attr_value"})
    logger("start Cloud function ----- ")
    //ps.createProduction()
    let prom = projectService.queryProduct()
    prom.then((r) => {
            logger(JSON.stringify(r))
            res.success(r);
        }
    )
})

Parse.Cloud.define('wechat-login', (req, res) => {
    let code = req.params.code
    weChatService.oauthLogin(code).subscribe((weRes : OAuthReply) => {
        if(isError(weRes)){
            logger(`oauthLogin failed with error ${JSON.stringify(weRes)}` )
            res.error("wechat-loggin failed" + JSON.stringify(weRes))
        }else{
            Parse.User.logIn<Parse.User>("user","password").then((user) => {
                res.success({"sessionToken": user.getSessionToken()})
            })
        }
    }, (err) => {
        res.error(err.status)
    })
})

var restrictedAcl = new Parse.ACL();
restrictedAcl.setPublicReadAccess(true);
restrictedAcl.setPublicWriteAccess(false);
Parse.Cloud.define("test", (req,res) => {
    let wechatToken:WeChatToken = new WeChatToken();
    wechatToken.set("openid", "readonly")
    wechatToken.set("name", "readonlyname")
    wechatToken.setACL(restrictedAcl)
    wechatToken.save().then((s) => {
        res.success(JSON.stringify("success save " + JSON.stringify(s)))
    })
})
Parse.Cloud.define("test1", (req,res) => {
    new Parse.Query("WeChatToken")
        .get("jXWR8YV5k7")
        // .get("pqSAGwSaHc")
        .then((s) => {
        res.success(JSON.stringify("success get " + JSON.stringify(s)))
    }, (err) =>{
        res.error(JSON.stringify(err))
        }
    )
})
Parse.Cloud.define("test2", (req,res) => {
    new Parse.Query("WeChatToken")
        //.get("jXWR8YV5k7")
        .get("pqSAGwSaHc")
        .then((s) => {
        res.success(JSON.stringify("success get " + JSON.stringify(s)))
    }, (err) =>{
        res.error(JSON.stringify(err))
        }
    )
})
Parse.Cloud.define("test3", (req,res) => {
    new Parse.Query("WeChatToken")
        .get("HHk8RteWEL")
        .then((s) => {
        // res.success(JSON.stringify("success get " + JSON.stringify(s)))
            s.set("openid","changed")
            s.save().then((s) => {
                    res.success(JSON.stringify("save again " + JSON.stringify(s)))
                }, (err) =>{
                    res.error(err)
                }
            )

    }, (err) =>{
        res.error(JSON.stringify(err))
        }
    )
})

