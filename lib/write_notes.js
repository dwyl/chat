var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

var obj = {
  notes: 'hello world'
}
var bucket = 'dwyl';
var s3bucket = new AWS.S3({params: {Bucket: bucket}});
s3bucket.createBucket(function() {
  var params = {
    Key: 'myKey.json',
    Body: JSON.stringify(obj),
    ContentType: 'application/json',
    ACL: 'public-read'};
  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to " + bucket + "/myKey.json");
    }
  });
});
