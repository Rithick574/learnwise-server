import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose"
import { KafkaModule } from './kafka/kafka.module';
import { MONGO_CONNECTION } from './app.properties';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    KafkaModule,
    AuthModule
  ],
})
export class AppModule {}
