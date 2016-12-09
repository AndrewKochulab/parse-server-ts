import {Msg} from "./outcome-message";
export interface IncomeXmlType{
  xml: IncomeTextMsg | IncomeImageMsg
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