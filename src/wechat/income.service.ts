import * as debug from 'debug'
import {IncomeXmlType} from "./modles/income-message";
import {Msg} from "./modles/outcome-message";
import {Observable} from "rxjs";
import {WeChatModule, xmlBuilder} from "./wechat.module";
import * as crypto from "crypto"
import {Exception} from "./modles/Exception";
import {WechatCommonService} from "./wechat-common.service";

export class IncomeService extends WechatCommonService{
  public serviceType:"income"
  constructor(){
    super("income")
  }

  public authConnection(timestamp:string, signature:string, nonce:string, echostr:string) :Observable<string|Exception> {
    let tmpArr = [WeChatModule.WX_CALLBACK_TOKEN,
      timestamp, nonce]
    tmpArr = tmpArr.sort()

    let tmpStr = tmpArr.reduce((a,b) => a + b)
    let sha1hex = crypto.createHash("sha1").update(tmpStr).digest("hex");
    this.logger(" sign = " + sha1hex);

    if(sha1hex === signature){
      return Observable.of(echostr)
    } else {
      return Observable.throw({code:403})
    }

  }

  public incomeMessage(income :IncomeXmlType) {

    let oXml: Msg
    let iXml = (income as IncomeXmlType).xml
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

    this.logger(income)
    let retXml = xmlBuilder.buildObject({xml:oXml})
    // retXml = retXml.substring(retXml.indexOf("\n"))
    this.logger(retXml)
    return Observable.of(retXml)
  }
}

export const incomeService = new IncomeService()