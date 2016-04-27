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
  m: 'How you doin?! @ '+ new Date().toUTCString(),
  t: Date.now(),
  n: 'joey'
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


test('invoke the lambda without an event.body (get messages)', function (t) {
  CONTEXT.succeed = function () {
    // console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
    // console.log(arguments); // the argument to context.succeed
    t.ok(arguments[0].length > 1, 'Message Count:' + arguments[0].length);
    t.end();
  };
  handler({}, CONTEXT);
});
