import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  // private readonly kafka = new Kafka({
  //   brokers: ['34.93.145.38:29092'],
  // });
  // private readonly kafka = new Kafka({
  //   brokers: ['localhost:29092'],
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

  async produce(record: ProducerRecord) {
    try {
      await this.producer.send(record);
      this.logger.log(`Message sent to ${record.topic}`);
    } catch (error) {
      this.logger.error(`Failed to send message to ${record.topic}:`, error);
      throw error;
    }
  }
}
