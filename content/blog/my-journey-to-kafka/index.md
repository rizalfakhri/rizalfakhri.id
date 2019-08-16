---
title: "My Journey to Kafka #1"
date: "2019-08-15 16:26"
description: "Wise man said, Learning by sharing is  better isnt't it?"
---

Hey! First of all, Please don't expect any advance stuff regarding Kafka here. I do still learn it too.

I'll documented it here. As far as i know about Kafka. Everyday! <span style="font-size: 10px;">Hopefully..</span>

<img src="http://kafka.apache.org/images/kafka_diagram.png" style="background: #fff; padding: 20px;text-align: center;">

### History

Talking about history, It originally build by [LinkedIn](https://linkedin.com) to handle their _large_ data stream that at that time no software availabe to do the job, so they decide to make one.

And what i mean by _large_ is means literally large, Like you know LinkedIn scale.

And after a while, LinkedIn donate the Kafka project to Apache Software Foundation, So here they are. Under [kafka.apache.org](https://kafka.apache.org).

### Here's what I know so far

So far, I do know that Kafka is a **Message Broker** that works by publishing & subscribing payload, it's called _message_ on kafka. Yeah it's message broker. Pretty neat eh?

> Apache Kafka® is a distributed streaming platform.

And what does that mean is I didn't understand it yet. So let's jump to it. Here's some words from official Kafka documentation.

Kafka has three capabilities:

- Publish and subscribe to streams of records, Similar to message queue or enterprise messaging system.
- Store streams of records in a fault-tolerant durable way.
- Process streams of records as they occur.


And Kafka is generally used for two broad classes of applications :
- Building real-time streaming data pipelines that reliably get data between systems or applications.
- Building real-time streaming applications that transform or react to the streams of data.

    
And here's the concepts:

- Kafka is run as a cluster on one or more servers that can span multiple datacenters.
- The Kafka cluster stores streams of records in categories called topics.
- Each record consists of a key, a value, and a timestamp.


Kafka has 4 core APIs, but it basically only use 2 APIs to get to work with Kafka 

1. The [Producer API](http://kafka.apache.org/documentation.html#producerapi) allows an application to publish a stream of records to one or more Kafka topics.
2. The [Consumer API](http://kafka.apache.org/documentation.html#consumerapi) allows an application to subscribe to one or more topics and process the  stream of records produced for them.
3. The [Streams API](http://kafka.apache.org/documentation/streams) allows an application to act as a stream processor, consuming an input stream from one or more topics and producing an output stream to one or more output topics, effectively transforming the input streams to output streams.
4. The [Connector API](http://kafka.apache.org/documentation.html#connect) allows building and running reusable producers or consumers that connect Kafka topics to existing applications or data systems. For example, a connector to a relational database might capture every change to a table.

<img src="http://kafka.apache.org/23/images/kafka-apis.png" style="background: #fff; padding: 20px;text-align: center;">


That's it!. I think that is what I need to know about Kafka so far. See you on the next part!

