import { Schema, model } from "mongoose";
import { UserEntity } from "../../../../domain/entities";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student"
    },
    profile: {
        avatar: {
            type: String
        },
        dob: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"]
        }
    },
    contact: {
        additionalEmail: {
            type: String
        },
        socialMedia: {
            instagram: String,
            linkedIn: String,
            github: String
        }
    },
    phoneNumber: { 
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profession: {
        type: String
    },
    otp: {
        type: String
    },
    profit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


export const User = model<UserEntity>("users", userSchema);