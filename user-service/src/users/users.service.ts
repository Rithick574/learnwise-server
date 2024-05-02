import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // constructor(private readonly _kafka: ProducerService) {}
  async addUser(userData: any): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
