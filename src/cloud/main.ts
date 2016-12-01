import * as debug from "debug";
import {ProjectService} from "./ProjectService";
const logger = debug("app:cloud")

Parse.Cloud.define('hello', function (req, res) {
    Parse.User.signUp("user","password",{"test_attr":"attr_value"})
    logger("start Cloud function ----- ")
    let ps = new ProjectService()
    //ps.createProduction()
    let prom = ps.queryProduct()
    prom.then((r) => {
            logger(JSON.stringify(r))
            res.success(r);
        }
    )
});
