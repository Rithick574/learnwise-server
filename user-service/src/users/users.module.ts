import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.model';
import {
  InstructorApplication,
  InstructorApplicationSchema,
} from './schema/instructor.model';
import { KafkaModule } from 'src/kafka/kafka.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => KafkaModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: InstructorApplication.name,
        schema: InstructorApplicationSchema,
      },
    ]),
    KafkaModule,
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
