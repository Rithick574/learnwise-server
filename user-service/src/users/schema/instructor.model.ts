import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstructorApplicationDocument = InstructorApplication & Document;

@Schema({ timestamps: true })
export class InstructorApplication {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  profession: string;

  @Prop({ required: true })
  profileDescription: string;

  @Prop()
  linkedIn: string;

  @Prop()
  github: string;

  @Prop({ default: false })
  accepted: boolean;
}

export const InstructorApplicationSchema = SchemaFactory.createForClass(InstructorApplication);
