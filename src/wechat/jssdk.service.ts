
import {Observable, Observer} from "rxjs";
import {wechatApi} from "./wechat.module";
import {WechatCommonService} from "./wechat-common.service";

export class JssdkService extends WechatCommonService{
  public serviceType : "jssdk"
  constructor(){
    super("jssdk")
  }


  public getJsConfig(jsApiList:[string], url:string, debug = false){
    var param = {
      debug: debug,
      jsApiList: jsApiList,
      url: url
    };

    //return Observable.of(this.api.getJsConfig(param, this.callback))
    return Observable.create(ob => {
      wechatApi.getJsConfig(param, this.callback(ob))
    })
  }

  callback(ob) : (err,data) => void{
    return (err,data)=>{
      if(err){
        err.code = 400
        ob.error(err)
      } else {
        ob.next(data)
      }
      ob.complete()
    }
  }

}


export const jssdkService = new JssdkService()
