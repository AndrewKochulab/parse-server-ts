
export class Catalog extends Parse.Object {
  constructor() {
    super("Catalog")
  }

  set name(val : string){
      this.set("name", val)
  }

  get name() : string{
    return this.get("name")
  }

  set description(val : string){
      this.set("description", val)
  }

  get description() : string{
    return this.get("description")
  }

  set parentCatalog(val : Catalog){
      this.set("parentCatalog", val)
  }

  get parentCatalog() : Catalog{
    return this.get("parentCatalog")
  }


}

console.log("+++++++++++++++++++++++ registerSubclass Catalog ++++++++++++++++++++")
Parse.Object.registerSubclass("Catalog", Catalog);
