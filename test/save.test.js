var test = require('tape');
var save = require('../lib/save');

var EVENT = {
  body: {
    m: 'Herro Wold! @ '+ new Date().toUTCString(),
    t: Date.now(),
    n: 'bot'
  }
};

test('invoke the save_message without a valid event', function (t) {
  save({}, function(err, data){
    console.log(err, data);
    t.ok(err);
    t.end();
  });
});

test('invoke the save_message', function (t) {
  save(EVENT, function(err, data){
    // console.log(err, data);
    t.equal(data.Key, 'chat/' + EVENT.body.t + '.json');
    t.end();
  });
});
