import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer,ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async onModuleInit() {
    this.producer.connect();
  }
  private readonly kafka = new Kafka({
    brokers: ['localhost:29092'],
  });
  private readonly producer: Producer = this.kafka.producer();
  async produce(record:ProducerRecord){
    await this.producer.send(record)
  }
}
