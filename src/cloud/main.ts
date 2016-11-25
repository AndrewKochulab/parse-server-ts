import * as Parse from 'parse'

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
