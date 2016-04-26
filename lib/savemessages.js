var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var bucket = 'dwyl';
var s3bucket = new AWS.S3({params: {Bucket: bucket}});

module.exports = function savemessages (event, callback){
  var params = {
    Key: 'chat/' + event.t + '.json',
    Body: JSON.stringify(event),
    ContentType: 'application/json',
    ACL: 'public-read'
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to ", data.Location);
      return callback(err, data);
    }
  });
}
