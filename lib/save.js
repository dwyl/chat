var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var bucket = 'dwyl';
var s3bucket = new AWS.S3({params: {Bucket: bucket}});

module.exports = function save_message (event, callback) {
  if(event && event.t) {
    var params = {
      Key: 'chat/' + event.t + '.json',
      Body: JSON.stringify(event),
      ContentType: 'application/json',
      ACL: 'public-read'
    };

    s3bucket.upload(params, function(err, data) {
      return callback(err, data);
    });
  } else {
    return callback('please provide valid message');
  }

}
