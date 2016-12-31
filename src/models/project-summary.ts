/// <reference types="parse" />

export type ProjectSummaryFields = "name" | "description";

export class ProjectSummary extends Parse.Object{
  constructor(){
    super("ProjectSummary")
  }
  set name(name:string){
    this.set("name",name);
  }
  get name(){
    return this.get("name");
  }
  set description(description:string){
    this.set("description",description);
  }
  get description(){
    return this.get("description");
  }
  image: Parse.File
}

console.log("+++++++++++++++++++++++ registerSubclass ProjectSummary ++++++++++++++++++++")
Parse.Object.registerSubclass("ProjectSummary",ProjectSummary)