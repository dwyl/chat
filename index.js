exports.handler = function (event, context) {
  return context.succeed({
    statusCode: 200,
    message: 'it worked!'
  });
};
  
