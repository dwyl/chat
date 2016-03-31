exports.handler = function (event, context) {
  var a = 5;
  var b = 10;
  console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);
  return context.succeed({
    statusCode: 200,
    message: 'it worked!'
  });
};
