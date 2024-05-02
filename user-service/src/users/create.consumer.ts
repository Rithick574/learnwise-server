import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Injectable()
export class CreateConsumer implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService) {}

  async onModuleInit() {
    this._consumer.consume(
      'user-service-topic',
      { topics: ['user-service-topic'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({ source: 'create-consumer',
            message:message.value.toString(),
            topic:topic.toString()
           });
        },
      },
    );
  }
}
