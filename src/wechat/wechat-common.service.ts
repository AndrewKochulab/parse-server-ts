import {CommonService} from "../services/common.service";
export class WechatCommonService extends CommonService{
  constructor(serviceName){
    super("wechat:"+serviceName)
  }
}