import { UserEntity } from "@/domain/entities";
import { User } from "@/infrastructure/database/mongodb/models";

export async function updateUserProfileConsumer(data: { kafkaMessage: { email: string, updatedUserData: UserEntity }}): Promise<void>{
    try {
      console.log("Received message for updating user profile:", data);
      const { email, updatedUserData } = data.kafkaMessage;
      await User.findOneAndUpdate({ email }, updatedUserData);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };
  