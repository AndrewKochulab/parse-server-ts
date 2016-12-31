import {Catalog} from "./Catalog";
export class Article extends Parse.Object {
  constructor() {
    super("Article")
  }

  set title(val : string){
      this.set("title", val)
  }

  get title() : string{
    return this.get("title")
  }

  set description(val : string){
      this.set("description", val)
  }

  get description() : string{
    return this.get("description")
  }

  set weight(val : number){
      this.set("weight", val)
  }

  get weight() : number{
    return this.get("weight")
  }

  set image(val : Parse.File){
      this.set("image", val)
  }

  get image() : Parse.File{
    return this.get("image")
  }

  set redirectUrl(val : string){
      this.set("redirectUrl", val)
  }

  get redirectUrl() : string{
    return this.get("redirectUrl")
  }

  set clickCount(val : number){
      this.set("clickCount", val)
  }

  get clickCount() : number{
    return this.get("clickCount")
  }

  set catalog(val : Catalog){
      this.set("catalog", val)
  }

  get catalog() : Catalog{
    return this.get("catalog")
  }

}

console.log("+++++++++++++++++++++++ registerSubclass Article ++++++++++++++++++++")
Parse.Object.registerSubclass("Article", Article);
