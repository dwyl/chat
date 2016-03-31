# chat

A technology showcase.

## Why?

This repo is designed as a *showcase* for how to build apps that scale.

We have built chat example apps a couple of times
[*before*](https://github.com/dwyl/hapi-socketio-redis-chat-example)
and the response has been good,  
this time our mission is to operate within a *very tight* set of ***constraints***:

1. No *Servers*
2. Progressive Enhancement (_Works when JavaScript is **OFF**_!)
3. Precisely Predictable (*Linear*) Performance

## What?

Chat. Probably the most scalable implementation you will see ...  
unless you work
for `{{ insert name of silicon valley unicorn messenger app here }}`.

## How?

### Lambda

### S3

We use S3 to render our initial page and host all our static content.
https://aws.amazon.com/s3/

### API Gateway

API Gateway routes the requests we make from the front-end through to
the Lambda function that will process it.
https://aws.amazon.com/api-gateway/

### Lambda

https://aws.amazon.com/lambda/

### DynamoDB

https://aws.amazon.com/dynamodb/

### Cognito

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
