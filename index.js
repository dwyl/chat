var get = require('./lib/get');
var save = require('./lib/save');

function handler (event, context) {
  console.log('event', JSON.stringify(event));
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log('context', JSON.stringify(context));
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');

  if(!event || !event.m) { // GET
    get(function(err, data) {
      context.succeed(data);
    });
  }
  else { // SAVE
    save(event, function(err, data) {
      // if (err) {
      //   console.log("Error uploading data: ", err);
      // } else {
        console.log("Successfully uploaded data to ", data.Location);
        return context.succeed(data.Location);
      // }
    });
  }

}

exports.handler = handler;
