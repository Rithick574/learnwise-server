import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.model';
import {
  InstructorApplication,
  InstructorApplicationDocument,
} from './schema/instructor.model';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { InstructorQueryDto } from './dto/instructor-query.dto';
import { InstructorResponse } from './interfaces/instructor-response.interface';

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

  async getAllInstructors(query: InstructorQueryDto): Promise<InstructorResponse> {
    try {
      const { status, search, page, limit } = query;
      let filter: any = { role: 'instructor' };
      if (status) {
        filter.isBlocked = status === 'blocked';
      }
      if (search) {
        filter = {
          ...filter,
          $or: [
            { firstName: { $regex: new RegExp(search, 'i') } },
            { lastName: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } }
          ]
        };
      }
      const [instructors, total] = await Promise.all([
        this.userModel.find(filter)
          .skip((page - 1) * limit)
          .limit(limit)
          .exec(),
        this.userModel.countDocuments(filter).exec(),
      ]);

      return {
        instructors,
        totalAvailableInstructors: total,
      }
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
      await this.instructorModel.updateOne({ _id: id }, { $set: { accepted } });
      const updatedApp = await this.instructorModel.findOne({ _id: id });
      const { github, linkedIn } = updatedApp;
      const updateUser = await this.userModel.updateOne(
        { email },
        {
          $set: {
            role: 'instructor',
            'contact.socialMedia.github': github,
            'contact.socialMedia.linkedIn': linkedIn,
          },
        },
      );
      const record = {
        topic: 'user-service-topic',
        messages: [
          {
            key: 'updateUserRole',
            value: JSON.stringify({
              email,
              newRole: 'instructor',
              github,
              linkedIn,
            }),
          },
        ],
      };
      await this.producerService.produce(record);
      const emailRecord = {
        topic: 'notification-service-topic',
        messages: [
          {
            key: 'emailNotificationForInstructorApplication',
            value: JSON.stringify({
              email,
            }),
          },
        ],
      };
      await this.producerService.produce(emailRecord);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async blockUnblockInstructor(
    id: string,
    isBlocked: boolean,
  ): Promise<UserDocument> {
    const instructor = await this.userModel.findById(id);
    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    instructor.isBlocked = isBlocked;
    await instructor.save();

    const record = {
      topic: 'user-status-update',
      messages: [
        {
          key: 'userBlockStatusChanged',
          value: JSON.stringify({
            id: instructor._id.toString(),
            isBlocked,
          }),
        },
      ],
    };
    try {
      await this.producerService.produce(record);
      return instructor;
    } catch (error) {
      throw new HttpException(
        'Failed to send status update message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async editUserProfile(
    userId: string,
    data: {
      firstName: string;
      lastName: string;
      phoneNumber?: string;
      profile?: {
        avatar?: string;
        dob?: string;
        gender?: string;
      };
      contact?: {
        socialMedia: {
          instagram?: string;
          github?: string;
          linkedIn?: string;
        };
        additionalEmail?: string;
      };
      email: string;
    },
  ): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: userId });
      console.log(
        '🚀 ~ file: users.service.ts:166 ~ UsersService ~ user:',
        user,
      );
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const _id = user._id;
      const updatedUserData = await this.userModel.findOneAndUpdate(
        { _id },
        { $set: { ...data } },
        { new: true },
      );

      //producer kafka
      const kafkaMessage = {
        email: userId,
        updatedUserData: updatedUserData.toJSON(), 
      };
      const kafkaRecord = {
        topic: 'user-profile-update',
        messages: [
          {
            key: 'userProfileUpdate',
            value: JSON.stringify({kafkaMessage}),
          },
        ],
      };
      await this.producerService.produce(kafkaRecord);
      return updatedUserData;
    } catch (error) {
      throw new HttpException(
        'Failed to edit user profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id)
    return user;
  }

  async updatePassword(userId: string, hashedNewPassword: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $set: { password: hashedNewPassword } });
    const updatedUserData = await this.userModel.findById(userId);
    if (!updatedUserData) {
      throw new Error('User not found after updating password');
  }
     // Produce Kafka message
     const kafkaMessage = {
      email: updatedUserData.email,
      updatedUserData: updatedUserData.toJSON(),
  };
  const kafkaRecord = {
      topic: 'user-profile-update',
      messages: [
          {
              key: 'userProfileUpdate',
              value: JSON.stringify({ kafkaMessage }),
          },
      ],
  };
  await this.producerService.produce(kafkaRecord);
  }
}
