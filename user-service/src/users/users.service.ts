import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.model';
import { InstructorApplication, InstructorApplicationDocument } from './schema/instructor.model';

@Injectable()
export class UsersService {
  constructor(
      // constructor(private readonly _kafka: ProducerService) {}
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(InstructorApplication.name) private instructorModel: Model<InstructorApplicationDocument>
  ) {}

  async addUser(userData: any): Promise<User> {
    if (typeof userData !== 'object') {
      throw new TypeError('userData must be an object');
    }
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async addInstructor(instructorData: any): Promise<InstructorApplication> {
    if (typeof instructorData !== 'object') {
      throw new TypeError('instructorData must be an object');
    }
    const newInstructor = new this.instructorModel(instructorData);
    return newInstructor.save();
  }
}
