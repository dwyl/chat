# chat

[![Build Status](https://travis-ci.org/dwyl/chat.svg?branch=master)](https://travis-ci.org/dwyl/chat)
<!--
[![codecov](https://codecov.io/gh/dwyl/chat/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/chat)
[![Code Climate](https://codeclimate.com/github/dwyl/chat/badges/gpa.svg)](https://codeclimate.com/github/dwyl/chat)
[![Dependency Status](https://david-dm.org/dwyl/chat.svg)](https://david-dm.org/dwyl/chat)
[![devDependency Status](https://david-dm.org/dwyl/chat/dev-status.svg)](https://david-dm.org/dwyl/chat#info=devDependencies)
-->


> try it: https://dwyl.s3.amazonaws.com/index.html

## Why?

![there-is-no-cloud-1920](https://cloud.githubusercontent.com/assets/194400/14860763/1b723cb8-0ca2-11e6-9112-5593228db117.png)

This repo is designed as a *showcase* for how to build apps that scale.

We have built chat example apps a couple of times
[*before*](https://github.com/dwyl/hapi-socketio-redis-chat-example)
and the response has been good,  
this time our mission is to operate within a *very tight* set of ***constraints***:

1. Easy to deploy to Heroku (_or other "Cloud PaaS" service_)
2. Progressive Enhancement (_Works when JavaScript is turned **OFF**_!)
3. Predictable (*Linear*) Performance

## What?

Chat. Probably the simplest and easiest to scale implementation you will see ...  
unless you work
for `{{ insert name of silicon valley unicorn messenger app here }}`.

## How?

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).
