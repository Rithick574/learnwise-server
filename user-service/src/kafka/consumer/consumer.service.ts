import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { UsersService } from 'src/users/users.service';  

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: ['localhost:29092'],
  });
  
  // private readonly kafka = new Kafka({
  //   clientId: "user-service",
  //   brokers: ["pkc-4j8dq.southeastasia.azure.confluent.cloud:9092"],
  //   ssl: true,
  //   sasl: {
  //     mechanism: "plain",
  //     username: "AH3AIXDBMRITWY2S",
  //     password:
  //       "PTTwXBptxZjyOa3DLtmSIjgC3mg8AZG8o1MB0pShQvbNX7bTC07O8HcgLAi+sqUj",
  //   },
  // });

  private readonly consumer: Consumer;

  constructor(private readonly usersService: UsersService) {
    this.consumer = this.kafka.consumer({ groupId: 'user-service-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'USER_SERVICE_TOPIC' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value?.toString();
        if (messageValue) {
          try {
            const userData = JSON.parse(messageValue);
            console.log('Parsed userData:', userData); 
            await this.usersService.addUser(userData);
          } catch (error) {
            console.error('Error processing message', error);
          }
        }
      }
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }
}
