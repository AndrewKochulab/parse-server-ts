import {NextFunction, Request, Response, Router} from "express";
import * as debug from "debug";
import * as wechat from "../wechat/wechat.module";

const logger = debug("app:api:wechat")
/**
 * / route
 *
 * @class User
 */
export class WeChatApi {

  /**
   * Create the routes.
   *
   * @class WeChatApi
   * @method create
   * @static
   */
  public static create(router: Router) {

    //log
    logger("[WeChatApi::create] Creating Weixin message route.");

    //add weixin message page route
    router.post("/wechat/message", incomeMessage);

    router.get("/wechat/message", authConnection);

    router.post("/wechat/jsconfig", jsconfig)

    //router.post("/wechat",)
  }

}


function handleObservable(observable, res, type?:string){
  observable.subscribe((data) => {
    if(type){
      res.status(200).type(type).send(data)
    } else {
      res.json(data)
    }
  }, (err) => {
    let resChain = res.status(err.code)
    if(err.message){
      resChain.send(err.message)
    } else {
      resChain.end()
    }
  })
}

function incomeMessage(req: Request, res: Response, next: NextFunction) {
  handleObservable(wechat.income.incomeMessage(req.body), res, "text/xml");
}

function authConnection(req: Request, res: Response, next: NextFunction) {
  handleObservable(wechat.income.authConnection(req.query.timestamp, req.query.signature, req.query.nonce, req.query.echostr),res)

}

function jsconfig(req: Request, res: Response, next: NextFunction) {
  handleObservable(wechat.jssdk.getJsConfig(req.body.jsApiList, req.body.url),res)
}