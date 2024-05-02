import { Module,forwardRef } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { ProducerService } from './producer/producer.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [ConsumerService, ProducerService],
  exports:[ConsumerService, ProducerService]
})
export class KafkaModule {}
