import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as debug from 'debug'
import xml2js = require("xml2js");
import OptionsV2 = xml2js.OptionsV2;


/**
 * / route
 *
 * @class User
 */
export class WeixinMessageRoute extends BaseRoute {

  static logger = debug("app:router:wx:message")

  /**
   * Create the routes.
   *
   * @class WeixinMessageRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    this.logger("[WeixinMessageRoute::create] Creating Weixin message route.");

    //add weixin message page route
    router.post("/wx/message", (req: Request, res: Response, next: NextFunction) => {
      new WeixinMessageRoute().incomeMessage(req, res, next);
    });

    router.get("/wx/message", (req: Request, res: Response, next: NextFunction) => {
      new WeixinMessageRoute().authConnect(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class WeixinMessageRoute
   * @constructor
   */
  constructor(private builder = new xml2js.Builder({cdata:true, headless:true}), private log = WeixinMessageRoute.logger) {
    super();
    let opt : OptionsV2 = {cdata:true};
  }

  /**
   * The weixin page route.
   *
   * @class WeixinMessageRoute
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

    this.log(req.body)
    let retXml = this.builder.buildObject({message:"test message"})
    // retXml = retXml.substring(retXml.indexOf("\n"))
    this.log(retXml)
    res.status(200).send(retXml)
  }

  public authConnect(req: Request, res: Response, next: NextFunction) {
    this.log(JSON.stringify(req.params))
    this.log(JSON.stringify(req.query))
    this.log(req.body)

    let retXml = this.builder.buildObject({message:"test message"})
    // retXml = retXml.substring(retXml.indexOf("\n"))
    this.log(retXml)

    res.status(200).send(req.query.echostr)
  }
}