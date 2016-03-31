# chat

A technology showcase.

## Why?

This repo is designed as a *showcase* for how to build apps that scale.

We have built chat example apps a couple of times
[before](https://github.com/dwyl/hapi-socketio-redis-chat-example)
and the response has been good,  
this time our mission is to operate within a *very tight* set of ***constraints***:

1. No *Servers*
2. Progressive Enhancement (Works when JavaScript is *disabled*!)
3. Precisely Predictable (*Linear*) Performance

## What?

Chat. Probably the most scalable implementation you will see.

## How?

### Lambda


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

### IOT





## Background Reading

### Learning by Doing

+ Access HTTP Headers:
http://stackoverflow.com/questions/31372167/how-to-access-http-headers-for-request-to-aws-api-gateway-using-lambda
+ Invoke Lambda by HTTP Request:
http://stackoverflow.com/questions/29877220/invoke-a-aws-lambda-function-by-a-http-request

### Discussion

We considered using S3 as our primary data store, but soon realized its not that "*simple*"...
see: Why does S3 still not support Appending? https://news.ycombinator.com/item?id=10746969
