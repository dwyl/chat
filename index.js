var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var bucket = 'dwyl';
var s3bucket = new AWS.S3({params: {Bucket: bucket}});

function handler (event, context) {
  console.log('event', JSON.stringify(event));
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');

  if(!event.msg) {
    return context.fail('no message in event');
  }

  var params = {
    Key: 'chat/' + event.msg.t + '.json',
    Body: JSON.stringify(event.msg),
    ContentType: 'application/json',
    ACL: 'public-read'
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to ", data.Location);
      return context.succeed(data.Location);
    }
  });
}

exports.handler = handler;
