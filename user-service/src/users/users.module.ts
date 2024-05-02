import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schema/users.model';
import { InstructorApplication,InstructorApplicationSchema } from './schema/instructor.model';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CreateConsumer } from './create.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: InstructorApplication.name, schema: InstructorApplicationSchema }  
    ]),
    KafkaModule
  ],
  providers: [UsersService,CreateConsumer],
  controllers: [UsersController],
})
export class UsersModule {}
