
import {ProjectService} from "./ProjectService";
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
  new ProjectService().queryProduct();
});
