var data = {
  messages: []
};

new Vue({
  el: '#chat',
  data: data
});

document.getElementById('send').addEventListener('click', function (e) {
  var say = document.getElementById('say')
  send(say.value);
  say.value = '';
});

function SigV4Utils(){}

SigV4Utils.sign = function(key, msg) {
  var hash = CryptoJS.HmacSHA256(msg, key);
  return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.sha256 = function(msg) {
  var hash = CryptoJS.SHA256(msg);
  return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.getSignatureKey = function(key, dateStamp, regionName, serviceName) {
  var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
  var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
  var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
  var kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
  return kSigning;
};

function createEndpoint(regionName, awsIotEndpoint, accessKey, secretKey) {
  var time = moment.utc();
  var dateStamp = time.format('YYYYMMDD');
  var amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
  var service = 'iotdevicegateway';
  var region = regionName;
  var secretKey = secretKey;
  var accessKey = accessKey;
  var algorithm = 'AWS4-HMAC-SHA256';
  var method = 'GET';
  var canonicalUri = '/mqtt';
  var host = awsIotEndpoint;

  var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
  var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
  canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
  canonicalQuerystring += '&X-Amz-Date=' + amzdate;
  canonicalQuerystring += '&X-Amz-SignedHeaders=host';

  var canonicalHeaders = 'host:' + host + '\n';
  var payloadHash = SigV4Utils.sha256('');
  var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

  var stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
  var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
  var signature = SigV4Utils.sign(signingKey, stringToSign);

  canonicalQuerystring += '&X-Amz-Signature=' + signature;
  return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
}

var endpoint = createEndpoint(
'eu-west-1', // Your Region
'a315z3lphjmasx.iot.eu-west-1.amazonaws.com',
'AKIAJHXKM73ALW5C4DPA',
'jykh9E8xVTSp9tNnh+WBrBBrm3XMOTapC4j7zTJ4');
var clientId = Math.random().toString(36).substring(7);
var client = new Paho.MQTT.Client(endpoint, clientId);
var connectOptions = {
  useSSL: true,
  timeout: 3,
  mqttVersion: 4,
  onSuccess: subscribe
};
client.connect(connectOptions);
client.onMessageArrived = onMessage;
client.onConnectionLost = function(e) { console.log(e) };

function subscribe() {
  client.subscribe("Test/chat");
  console.log("subscribed");
}

function send(content) {
  var message = new Paho.MQTT.Message(content);
  message.destinationName = "Test/chat";
  client.send(message);
  console.log("sent");
}

function onMessage(message) {
  data.messages.push(message.payloadString);
  console.log("message received: " + message.payloadString);
}
