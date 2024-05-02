import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose"
import { KafkaModule } from './kafka/kafka.module';
import { MONGO_CONNECTION } from './app.properties';

@Module({
  imports: [UsersModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    KafkaModule
  ],
})
export class AppModule {}
