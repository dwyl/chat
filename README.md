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


curl -v -H "Content-Type: application/json" -X POST -d '{"m":"curl this","n":"a person","t":"1234"}' https://r09u5uw11g.execute-api.eu-west-1.amazonaws.com/prod/savemessage




### S3

We use S3 to render our initial page and host all our static content.
https://aws.amazon.com/s3/
+ Node.js SDK Examples: http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
+ Working with Folders: http://docs.aws.amazon.com/AmazonS3/latest/UG/FolderOperations.html

### API Gateway

```js
##  See http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
##  This template will pass through all parameters including path, querystring, header, stage variables, and context through to the integration endpoint via the body/payload
#set($allParams = $input.params())
{
"body-json" : "$input.json('$')",
"params" : {
#foreach($type in $allParams.keySet())
    #set($params = $allParams.get($type))
"$type" : {
    #foreach($paramName in $params.keySet())
    "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
        #if($foreach.hasNext),#end
    #end
}
    #if($foreach.hasNext),#end
#end
},
"stage-variables" : {
#foreach($key in $stageVariables.keySet())
"$key" : "$util.escapeJavaScript($stageVariables.get($key))"
    #if($foreach.hasNext),#end
#end
},
"context" : {
    "account-id" : "$context.identity.accountId",
    "api-id" : "$context.apiId",
    "api-key" : "$context.identity.apiKey",
    "authorizer-principal-id" : "$context.authorizer.principalId",
    "caller" : "$context.identity.caller",
    "cognito-authentication-provider" : "$context.identity.cognitoAuthenticationProvider",
    "cognito-authentication-type" : "$context.identity.cognitoAuthenticationType",
    "cognito-identity-id" : "$context.identity.cognitoIdentityId",
    "cognito-identity-pool-id" : "$context.identity.cognitoIdentityPoolId",
    "http-method" : "$context.httpMethod",
    "stage" : "$context.stage",
    "source-ip" : "$context.identity.sourceIp",
    "user" : "$context.identity.user",
    "user-agent" : "$context.identity.userAgent",
    "user-arn" : "$context.identity.userArn",
    "request-id" : "$context.requestId",
    "resource-id" : "$context.resourceId",
    "resource-path" : "$context.resourcePath"
    }
}

```

API Gateway routes the requests we make from the front-end through to
the Lambda function that will process it.
+ Overview: https://aws.amazon.com/api-gateway/
+ SDK Docs: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html
+ HTTP Method: http://stackoverflow.com/questions/35252544/how-to-get-the-http-method-in-aws-lambda

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
