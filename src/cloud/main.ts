
import {ProjectService} from "./ProjectService";
Parse.Cloud.define('hello', function(req, res) {
  var prom = new ProjectService().queryProduct();
  prom.then((r) => res.success(JSON.stringify(r)))
});
