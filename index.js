const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'kafka-nodejs-starter',
  brokers: ['localhost:9092'],
});


const producer = kafka.producer()
const TOPIC = "greeting";
let message = [ { value: {msg:"Nice",name:" Try!"} }, ];
console.log( message );

async function sendIT() {		
		// Connect to the producer
		await producer.connect()

		// Send an event to the demoTopic topic
		await producer.send({
		  topic: TOPIC,
		  messages: [
			{ value: "Hello !!!" },
		  ],
 		  messages: [{
        	value: JSON.stringify(message)
      	  }]
		  
		});

		// Disconnect the producer once we're done
		await producer.disconnect();
}

sendIT();


const consumer = kafka.consumer({ groupId: 'test-group' })

async function receiveIT() {
		await consumer.connect()
		await consumer.subscribe({ topic: TOPIC, fromBeginning: true })

		await consumer.run({
		  eachMessage: async ({ topic, partition, message }) => {
			console.log(topic, partition, {
			  value: message.value.toString(),
			})
		  },
		});
}

receiveIT();

