const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'kafka-nodejs-starter',
  brokers: ['localhost:9092'],
});


const producer = kafka.producer()

async function sendIT() {		
		// Connect to the producer
		await producer.connect()

		// Send an event to the demoTopic topic
		await producer.send({
		  topic: "demoTopic",
		  messages: [
			{ value: 'Hello micro-services world!' },
		  ],
		});

		// Disconnect the producer once we're done
		await producer.disconnect();
}

sendIT();
