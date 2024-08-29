import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  // private readonly kafka = new Kafka({
  //   brokers: ['34.93.145.38:29092'],
  // });

  private readonly kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'IGI4TMEEZDD5XDZG',
      password:
        'KYygx3UkksOGC9+Iur1t5EPU3MlyQfY2qBgJ1zHfxW3leYtYefDoikTYcR8EjsPk',
    },
    connectionTimeout: 30000,
    authenticationTimeout: 30000,
  });

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
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }
}
