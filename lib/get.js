var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var bucket = 'dwyl';
var s3 = new AWS.S3();
var s3bucket = new AWS.S3({params: {Bucket: bucket}});


var allKeys = [];

var PARAMS = {
  Bucket: bucket,
  Delimiter: '',
  EncodingType: 'url',
  Marker: '0',
  Prefix: 'chat/'
}

function listAllKeys(params, cb) {
  // console.log(params);
  s3.listObjects(params, function(err, data){
    // console.log(err, data.Marker, data.IsTruncated);
    if(!err && data) {
      data.Contents.forEach(function(i){
        allKeys.push(i)
      })
    }
    if(data.IsTruncated) {
      var nextParams = JSON.parse(JSON.stringify(params)); // clone params
      nextParams.Marker = allKeys[allKeys.length -1].Key.replace('%3A',':'); // recycle params
      return listAllKeys(nextParams, cb);
    }
    else {
      var sorted = allKeys
      .filter((e) => {return e.Key.match(/\.json/)})
      .sort((a, b) => { return new Date(a.LastModified).getTime() < new Date(b.LastModified).getTime(); });
      cb(null, sorted);
    }
  });
}

function get_messages (keys, callback) {
  var messages = [];
  var count = 0;
  keys.forEach((k) => {
  s3.getObject({Bucket: bucket, Key: k.Key}, function (err, data){
    // console.log(err,data);
    // attempt to parse the data as JSON
    try {
      var json = JSON.parse(data.Body.toString());
      messages.push({
        m: json.m,
        n: json.n,
        t: json.t
      });
      // console.log(messages[messages.length - 1]);
    } catch (e) {} // do nothing if it fails.
    if(++count === keys.length) {
      var sorted = messages.sort((a,b) => {
        return new Date(a.t).getTime() > new Date(b.t).getTime();
      });
      callback(null, sorted);
    }
    });
  });
}

module.exports = function get_all_messages_in_order (callback) {
  allKeys = []; // reset the array! ... TODO: don't use GLOBAL!
  listAllKeys(PARAMS, function(err, sorted){
    get_messages(sorted, callback);
  });
};
