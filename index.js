var savemessages = require('./lib/savemessages');

function handler (event, context) {
  console.log('event', JSON.stringify(event));
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log('context', JSON.stringify(context));
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');

  if(!event.m) {
    return context.fail('no message in event');
  }

  savemessages(event, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to ", data.Location);
      return context.succeed(data.Location);
    }
  });
}

exports.handler = handler;
