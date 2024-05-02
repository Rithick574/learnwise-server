import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ['student', 'instructor', 'admin'], default: 'student' })
  role: string;

  @Prop({
    type: {
      avatar: String,
      dob: String,
      gender: { type: String, enum: ['male', 'female', 'other'] }
    }
  })
  profile: {
    avatar: string;
    dob: string;
    gender: string;
  };

  @Prop({
    type: {
      additionalEmail: String,
      phone: String,
      socialMedia: {
        instagram: String,
        linkedIn: String,
        github: String
      }
    }
  })
  contact: {
    additionalEmail: string;
    phone: string;
    socialMedia: {
      instagram: string;
      linkedIn: string;
      github: string;
    };
  };

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  profession: string;

  @Prop()
  otp: string;

  @Prop({ default: 0 })
  profit: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
