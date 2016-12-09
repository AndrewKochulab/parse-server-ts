import {ProjectSummary} from "../models/project-summary";
import {CommonService} from "./common.service";


export class ProjectService extends CommonService {
  serviceType : "project"
  constructor() {
    super("project")
  }

  queryProduct() {
    let project = new ProjectSummary()
    let query = new Parse.Query("ProjectSummary")
    let p = query.equalTo("name", "project1")
    return p.find();
  }

  createProduction() {
    let project = new ProjectSummary();
    project.name = "project1";
    project.description = "desc"
    project.save().then(
      (v) => this.logger("save success " + JSON.stringify(v)),
      (e) => this.logger("save failed " + JSON.stringify(e)))

  }
}

export const projectService = new ProjectService()