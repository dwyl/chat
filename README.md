# chat

[![Build Status](https://travis-ci.org/dwyl/chat.svg?branch=master)](https://travis-ci.org/dwyl/chat)
[![codecov](https://codecov.io/gh/dwyl/chat/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/chat)
[![Code Climate](https://codeclimate.com/github/dwyl/chat/badges/gpa.svg)](https://codeclimate.com/github/dwyl/chat)
[![Dependency Status](https://david-dm.org/dwyl/chat.svg)](https://david-dm.org/dwyl/chat)
[![devDependency Status](https://david-dm.org/dwyl/chat/dev-status.svg)](https://david-dm.org/dwyl/chat#info=devDependencies)


> try it: https://dwyl.s3.amazonaws.com/index.html

## Why?

![there-is-no-cloud-1920](https://cloud.githubusercontent.com/assets/194400/14860763/1b723cb8-0ca2-11e6-9112-5593228db117.png)

This repo is designed as a *showcase* for how to build apps that scale.

We have built chat example apps a couple of times
[*before*](https://github.com/dwyl/hapi-socketio-redis-chat-example)
and the response has been good,  
this time our mission is to operate within a *very tight* set of ***constraints***:

1. No *Servers*
2. Progressive Enhancement (_Works when JavaScript is **OFF**_!)
3. Precisely Predictable (*Linear*) Performance

## What?

Chat. Probably the simplest and easiets to scale implementation you will see ...  
unless you work
for `{{ insert name of silicon valley unicorn messenger app here }}`.

## How?

### Lambda

https://aws.amazon.com/lambda/
+ Request Rate Exceeded:
http://stackoverflow.com/questions/36826352/aws-lambda-toomanyrequestsexception-rate-exceeded/

### S3

We use S3 to render our initial page and host all our static content.
https://aws.amazon.com/s3/
+ Node.js SDK Examples: http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
+ Working with Folders: http://docs.aws.amazon.com/AmazonS3/latest/UG/FolderOperations.html

### API Gateway

API Gateway routes the requests we make from the front-end through to
the Lambda function that will process it.

#### Body Mapping Templates

In order to allow the data submitted by the client to flow through to the Lambda
we need to define a
["Body Mapping Template"](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html).



##### `application/json` Body Mapping Template:
```js
{
  ## extract all params in body as JSON;
  "body": $input.json('$'),
  "context" : {
    "method" : "$context.httpMethod",
    "path" : "$context.resourcePath",
    "stage" : "$context.stage",
    "source_ip" : "$context.identity.sourceIp",
    "user_agent" : "$context.identity.userAgent",
    "user_arn" : "$context.identity.userArn",
    "request_id" : "$context.requestId",
    "resource_id" : "$context.resourceId"
  },
  "headers": {
    #foreach($param in $input.params().header.keySet())
    "$param": "$util.escapeJavaScript($input.params().header.get($param))" #if($foreach.hasNext),#end
    #end
  }
}
```

Once Body Mapping Template is enabled, test using `curl`:
```sh
curl -v -H "Content-Type: application/json" -X POST -d '{"m":"Hello World!","n":"yourname","t":"123456"}' https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod/savemessage
```

With Authorization Header:
```sh
curl -v -H "Content-Type: application/json" -X POST -d '{"m":"1348","n":"yourname","t":"12345678"}' -H "Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A" https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod/savemessage
```

GET messages:
```js
curl https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod/chat
```

curl -v -H "Content-Type: application/json" -X POST -d '{"m":"Hello World!","n":"yourname","t":"123456"}' https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod/chat

+ Overview: https://aws.amazon.com/api-gateway/
+ SDK Docs: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html
+ HTTP Method: http://stackoverflow.com/questions/35252544/how-to-get-the-http-method-in-aws-lambda
+ Passing form data through API Gateway to Lambda:
http://stackoverflow.com/questions/32057053/how-to-pass-a-params-from-post-to-aws-lambda-from-amazon-api-gateway
which lead to: https://forums.aws.amazon.com/thread.jspa?messageID=673012
+ Headers: http://stackoverflow.com/questions/31372167/how-to-access-http-headers-for-request-to-aws-api-gateway-using-lambda
+ Velocity Template Language (for mapping):
http://velocity.apache.org/engine/devel/vtl-reference-guide.html
+ `Could not parse request body into json` ...
https://forums.aws.amazon.com/thread.jspa?threadID=221749



### IOT

### WebRTC?

Over **50% of browsers** (Firefox & Chrome) which means
we can cut-out paying for IOT messages for the people
who are using good browsers.

http://caniuse.com/#feat=rtcpeerconnection

This also means when we use Electron

## How *much* ($£€) ?

How much does all of this cost...?

Let's break down the cost in the order of the Tech Stack.

### S3

https://aws.amazon.com/s3/pricing/

### API Gateway

https://aws.amazon.com/api-gateway/pricing/

> What is a read/write capacity unit?
http://aws.amazon.com/dynamodb/faqs/#What_is_a_readwrite_capacity_unit

### Lambda

https://aws.amazon.com/lambda/pricing/

### DynamoDB

https://aws.amazon.com/dynamodb/pricing/

### Cognito

Amazon Cognito costs $0.15 for each 10,000 sync operations and $0.15 per GB of sync store per month.

https://aws.amazon.com/cognito/pricing/

### IOT

$5 per million messages.

A message is a 512-byte block of data processed by AWS IoT – either published to or delivered by the Service. For example, a 900-byte payload is billed as two messages.

https://aws.amazon.com/iot/pricing/



## Background Reading

### Learning by Doing

+ Access HTTP Headers:
http://stackoverflow.com/questions/31372167/how-to-access-http-headers-for-request-to-aws-api-gateway-using-lambda
+ Cookies on Lambda:
http://stackoverflow.com/questions/31851860/access-http-request-headers-query-string-cookies-body-object-in-lambda-with
+ Invoke Lambda by HTTP Request:
http://stackoverflow.com/questions/29877220/invoke-a-aws-lambda-function-by-a-http-request
+ Render HTML in Lambda:
http://kennbrodhagen.net/2016/01/31/how-to-return-html-from-aws-api-gateway-lambda/
+ Render React on Lambda:
https://medium.com/@devknoll/rendering-react-with-amazon-lambda-e4e85a788257

### Discussion

We considered using S3 as our primary data store, but soon realized its not that "*simple*"...
see: Why does S3 still not support Appending? https://news.ycombinator.com/item?id=10746969
