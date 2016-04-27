var test = require('tape');
var get = require('../lib/get');

var EVENT = {
  body: {
    m: 'Tests...',
    t: Date.now(),
    n: 'bot'
  }
};

test('invoke the save_message', function (t) {
  get(function(err, data){
    // console.log(err, data);
    t.ok(data.length > 1);
    t.end();
  });
});
