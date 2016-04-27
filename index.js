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
  else if (event.m) { // SAVE
    save(event, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to ", data.Location);
        return context.succeed(data.Location);
      }
    });
  }
  else {
    context.fail('no message provided')
  }

}

exports.handler = handler;
