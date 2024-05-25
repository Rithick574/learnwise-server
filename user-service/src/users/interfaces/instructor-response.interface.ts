import { User } from "../schema/users.model";

export interface InstructorResponse {
    instructors: User[];
    totalAvailableInstructors: number;
  }