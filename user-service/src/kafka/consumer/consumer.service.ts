import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, ConsumerSubscribeTopics, ConsumerRunConfig, EachMessagePayload } from 'kafkajs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: ['localhost:29092'],
  });

  private readonly consumers: Consumer[] = [];

  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    await this.consume({
      groupId: 'user-group',
      topics: ['user-topic'],
      config: {
        eachMessage: async (payload: EachMessagePayload) => {
          const message = payload.message.value?.toString();
          if (message) {
            const userData = JSON.parse(message);
            this.usersService.addUser(userData);
          }
        }
      }
    });
  }

  async consume({ groupId, topics, config }: { groupId: string; topics: string[]; config: ConsumerRunConfig }) {
    const consumer: Consumer = this.kafka.consumer({ groupId });
    await consumer.connect().catch((e) => console.log(e));
    await consumer.subscribe({ topics });
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
