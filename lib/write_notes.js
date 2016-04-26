var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

function handler (event, context) {
  if(!event.message) {
    context.fail('no message in event');
  }
  var obj = {
    m: event.m,
    t: Date.now(),
    n: 'bot'
  }
  var bucket = 'dwyl';
  var s3bucket = new AWS.S3({params: {Bucket: bucket}});
  var params = {
    Key: 'chat/myKey.json',
    Body: JSON.stringify(obj),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to ", data.Location);
      context.succeed(data.Location);
    }
  });
}
var CONTEXT = {
  succeed: function (data) {
    console.log(data);
  },
  fail: function (err) {
    console.log(err);
  }
}
var event = {m: 'hello Ines'}
handler(event, CONTEXT);

exports.handler = handler;
