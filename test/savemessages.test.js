var test = require('tape');
var savemessages = require('../lib/savemessages');

var EVENT = {
  m: 'Herro!',
  t: Date.now(),
  n: 'bot'
};

test('invoke the save_message', function (t) {
  savemessages(EVENT, function(err, data){
    // console.log(err, data);
    t.equal(data.Key, 'chat/' + EVENT.t + '.json');
    t.end();
  });
});
