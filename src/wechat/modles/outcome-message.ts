
export interface OutcomeXmlType{
  xml: TextMsg | ImageMsg | VoiceMsg | VideoMsg | NewsMsg | MusicMsg
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


