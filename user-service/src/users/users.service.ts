import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async addInstructor(instructorData: any, userId: string): Promise<InstructorApplication | null> {
    console.log("🚀 ~ file: users.service.ts:24 ~ UsersService ~ addInstructor ~ userId:", userId)
    console.log("🚀 ~ file: users.service.ts:24 ~ UsersService ~ addInstructor ~ instructorData:", instructorData)
    const existingApplication = await this.instructorModel.findOne({ email: userId });
    if (existingApplication) {
      if (existingApplication.accepted) {
        throw new HttpException('Already you are an instructor', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Already applied', HttpStatus.BAD_REQUEST);
      }
    }

    const newInstructor = new this.instructorModel({
      email:userId,
      ...instructorData, 
    });
    return newInstructor.save();
  }
}
