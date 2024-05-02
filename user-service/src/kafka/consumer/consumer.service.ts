import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { UsersService } from 'src/users/users.service';  

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: ['localhost:29092'],
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
        const key = message.key?.toString();
        const value = message.value?.toString();

        if (value) {
          try {
            const data = JSON.parse(value);
            if (key === 'USER_CREATED_MESSAGE') {
              await this.usersService.addUser(data);  
            }
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
