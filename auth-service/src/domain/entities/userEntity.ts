import { ObjectId } from "mongoose";

enum Role {
    student = 'student',
    instructor = 'instructor',
    admin = 'admin'
}

enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

interface SocialMedia {
    instagram?: string;
    linkedIn?: string;
    github?: string;
}

interface Contact {
    additionalEmail?: string;
    phone?: string;
    socialMedia?: SocialMedia;
}

interface Profile {
    avatar?: string;
    dob?: Date;
    gender?: Gender;
}

export interface UserEntity {
    _id?: ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    role: Role;
    profile?: Profile;
    contact?: Contact;
    isBlocked: boolean;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    otp?: string;
    profession?: string;
}