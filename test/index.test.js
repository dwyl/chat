var test = require('tape');
var handler = require('../index').handler;

var CONTEXT = {
  functionName: 'LambdaTest',
  functionVersion: '1',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:123456:function:LambdaTest:$LATEST'
};

var EVENT = {
  data: 'hello'
};

test('invoke the lambda function handler', function (t) {
  CONTEXT.succeed = function () {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
    // console.log(arguments); // the argument to context.succeed
    t.ok(arguments[0], 'Res:' + JSON.stringify(arguments[0]));
    t.end();
  };
  handler(EVENT, CONTEXT);
});
