import {CommonService} from "../services/common.service";
export abstract class WechatCommonService extends CommonService{
  constructor(serviceName){
    super(serviceName)
  }
}