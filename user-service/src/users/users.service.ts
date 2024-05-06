import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.model';
import {
  InstructorApplication,
  InstructorApplicationDocument,
} from './schema/instructor.model';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly producerService: ProducerService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(InstructorApplication.name)
    private instructorModel: Model<InstructorApplicationDocument>,
  ) {}

  async addUser(userData: any): Promise<User> {
    if (typeof userData !== 'object') {
      throw new TypeError('userData must be an object');
    }
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async addInstructor(
    instructorData: any,
    userId: string,
  ): Promise<InstructorApplication | null> {
    const existingApplication = await this.instructorModel.findOne({
      email: userId,
    });
    if (existingApplication) {
      if (existingApplication.accepted) {
        throw new HttpException(
          'Already you are an instructor',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException('Already applied', HttpStatus.BAD_REQUEST);
      }
    }

    const newInstructor = new this.instructorModel({
      email: userId,
      ...instructorData,
    });
    return newInstructor.save();
  }

  async getAllInstructors(): Promise<User[]> {
    try {
      const allInstructors = await this.userModel.find({ role: 'instructor' });
      return allInstructors;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve instructors',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllInstructorRequests(): Promise<InstructorApplication[]> {
    try {
      const allRequests = await this.instructorModel.find({ accepted: false });
      return allRequests;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve instructor Requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateApplicationStatusAndRole(
    id: string,
    email: string,
    accepted: boolean,
  ): Promise<any> {
    try {
      const updateApp = await this.instructorModel.updateOne(
        { _id: id },
        { $set: { accepted } },
      );
      const updateUser = await this.userModel.updateOne(
        { email },
        { $set: { role: 'instructor' } },
      );
      const record = {
        topic: 'user-service-topic',
        messages: [
          {
            key: 'updateUserRole',
            value: JSON.stringify({ email, newRole: 'instructor' }),
          },
        ],
      };
      await this.producerService.produce(record);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
