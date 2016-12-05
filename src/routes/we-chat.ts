import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as debug from 'debug'
import * as xml2js from "xml2js"
import * as crypto from "crypto"

/**
 * / route
 *
 * @class User
 */
export class WeChatRoute extends BaseRoute {

  static logger = debug("app:router:wx:message")

  private static _WX_CALLBACK_TOKEN = process.env.WX_CALLBACK_TOKEN || "Xclipse"
  public static get WX_CALLBACK_TOKEN() {
    return WeChatRoute._WX_CALLBACK_TOKEN
  }

  /**
   * Create the routes.
   *
   * @class WeChatRoute
   * @method create
   * @static
   */
  public static create(router: Router) {

    //log
    this.logger("[WeChatRoute::create] Creating Weixin message route.");

    //add weixin message page route
    router.post("/wechat/message", (req: Request, res: Response, next: NextFunction) => {
      new WeChatRoute().incomeMessage(req, res, next);
    });

    router.get("/wechat/message", (req: Request, res: Response, next: NextFunction) => {
      new WeChatRoute().authConnect(req, res, next);
    });
    
    router.post("/wechat",)
  }

  /**
   * Constructor
   *
   * @class WeChatRoute
   * @constructor
   */
  constructor(private builder = new xml2js.Builder({cdata:true, headless:true}), private log = WeChatRoute.logger) {
    super();
    let opt : xml2js.OptionsV2 = {cdata:true};
  }

  /**
   * The weixin page route.
   *
   * @class WeChatRoute
   * @method incomeMessage
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public incomeMessage(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Weixin Message";

    //set message
    let options: Object = {
      "message": "Weixin message "
    };

    let oXml: Msg
    let iXml = (req.body as IncomeXmlType).xml
    switch(iXml.MsgType){
      case "text":
        oXml = {
          FromUserName: iXml.ToUserName,
          ToUserName: iXml.FromUserName,
          CreateTime: Date.now(),
          Content: "testing reply",
          MsgType:"text"
        }
    }


    this.log(req.body)
    let retXml = this.builder.buildObject({xml:oXml})
    // retXml = retXml.substring(retXml.indexOf("\n"))
    this.log(retXml)
    res.status(200).type("text/xml").send(retXml)
  }

  public authConnect(req: Request, res: Response, next: NextFunction) {
    this.log(JSON.stringify(req.params))
    this.log(JSON.stringify(req.query))
    this.log(req.body)

    let tmpArr = [WeChatRoute.WX_CALLBACK_TOKEN,
      req.query.timestamp, req.query.nonce]
    tmpArr = tmpArr.sort()

    let tmpStr = tmpArr.reduce((a,b) => a + b)
    let sha1hex = crypto.createHash("sha1").update(tmpStr).digest("hex");
    this.log(" sign = " + sha1hex);

    if(sha1hex === req.query.signature){
      res.status(200).send(req.query.echostr)
    } else {
      res.status(403).end()
    }
  }
}

export interface OutcomeXmlType{
  xml: TextMsg | ImageMsg | VoiceMsg | VideoMsg | NewsMsg | MusicMsg
}

export interface IncomeXmlType{
  xml: IncomeTextMsg | IncomeImageMsg
}

export interface Msg{
  ToUserName: string
  FromUserName: string
  CreateTime: number
  MsgType:string
  Content: String
}

export interface TextMsg extends Msg{
  MsgType:"text"
  Content: String
}

export interface ImageMsg extends Msg{
  MsgType:"image"
  ImageId: {MediaId: string}
}

export interface VoiceMsg extends Msg{
  MsgType:"voice"
  Voice: {MediaId: string}
}

export interface VideoMsg extends Msg{
  MsgType:"video"
  Video: {
    MediaId: string
    Title?: string
    Description?: string
  }
}

export interface MusicMsg extends Msg{
  MsgType:"music"
  Music: {
    Title?: string
    Description?: string
    MusicUrl?: string
    HQMusicUrl?:string
    ThumbMediaId?:string
  }
}

export interface NewsMsg extends Msg{
  MsgType:"news"
  ArticleCount: number
  Articles: {
    item:[{
      Title?: string
      Description?: string
      PicUrl?: string
      Url?:string
    }]
  }
}


export interface IncomeMsg extends Msg{
  MsgId:number
}

export interface IncomeTextMsg extends Msg{
  MsgType:"text"
  Content:string
}

export interface IncomeImageMsg extends Msg{
  MsgType:"image"
  PicUrl?:string
  MediaId?:string
}