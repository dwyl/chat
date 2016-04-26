var test = require('tape');
var handler = require('../index').handler;

var CONTEXT = {
  functionName: 'LambdaTest',
  functionVersion: '1',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:123456:function:LambdaTest:$LATEST',
  fail: function (err) {
    console.log('FAIL:', err);
  }
};

var EVENT = {
  msg: {
    m: 'Herro!',
    t: Date.now(),
    n: 'bot'
  }
};

test('invoke the save_message', function (t) {
  CONTEXT.succeed = function () {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
    console.log(arguments); // the argument to context.succeed
    t.ok(arguments[0], 'Res:' + JSON.stringify(arguments[0]));
    t.end();
  };
  handler(EVENT, CONTEXT);
});
