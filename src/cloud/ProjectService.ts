
import {ProjectSummary} from "./domain/project-summary";

export class ProjectService {
    constructor(){

    }

    queryProduct(){
        let project = new ProjectSummary()
        let query = new Parse.Query("ProjectSummary")
        let p  = query.equalTo("name", "project1")
        p.find().then(
            v=>console.log(JSON.stringify(v))
        )
    }
}