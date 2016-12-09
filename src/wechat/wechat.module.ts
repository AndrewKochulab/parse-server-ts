import * as debug from 'debug'
import * as xml2js from "xml2js"
import {environment} from "../environments/environment";
import {oauthService} from "./oauth.service";
import {jssdkService} from "./jssdk.service";
import {incomeService} from "./income.service";

export class WeChatModule {
  public basicNamespace = "app:service:wechat"
  private logger = debug(this.basicNamespace)

  private static _WX_CALLBACK_TOKEN = process.env.WX_CALLBACK_TOKEN || "Xclipse"
  public static get WX_CALLBACK_TOKEN() {
    return WeChatModule._WX_CALLBACK_TOKEN
  }

  /**
   * Constructor
   *
   * @class WeChatModule
   * @constructor
   */
  constructor() {
    this.logger(" ============ initial wechat module it will run only one time!! ========")

  }
}

const xmlOpt : xml2js.OptionsV2 = {cdata:true, headless:true}
export const xmlBuilder = new xml2js.Builder(xmlOpt)

const WchatAPI  = require("wechat-api")
export const wechatApi = new WchatAPI(environment.wechat.appid, environment.wechat.appsecret);

export const wechat = new WeChatModule()
export const jssdk = jssdkService
export const income = incomeService
export const oauth = oauthService;

