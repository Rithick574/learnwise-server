import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['34.93.145.38:29092'],
  });
  // private readonly kafka = new Kafka({
  //   brokers: ['localhost:29092'],
  // });
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

  private readonly producer: Producer = this.kafka.producer();
  private readonly logger = new Logger(ProducerService.name);

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.logger.log('Kafka Producer connected successfully.');
    } catch (error) {
      this.logger.error('Failed to connect Kafka Producer:', error);
      throw error;
    }
  }

  async onApplicationShutdown() {
    try {
      await this.producer.disconnect();
      this.logger.log('Kafka Producer disconnected successfully.');
    } catch (error) {
      this.logger.error('Failed to disconnect Kafka Producer:', error);
    }
  }

  async produce(record:ProducerRecord) {
    try {
      await this.producer.send(record);
      this.logger.log(`Message sent to ${record.topic}`);
    } catch (error) {
      this.logger.error(`Failed to send message to ${record.topic}:`, error);
      throw error; 
    }
  }
}
