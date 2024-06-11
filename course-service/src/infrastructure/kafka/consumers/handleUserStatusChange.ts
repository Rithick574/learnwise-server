import { User } from "@/infrastructure/database/mongoDB/models/user"; 

export async function userBlockStatusChanged(data: {
  id: string;
  isBlocked: boolean;
}): Promise<void> {
  console.log(data);
  
  console.log(`User ${data.id} block status changed to ${data.isBlocked}`);
  try {
    const updated = await User.findByIdAndUpdate(data.id, {
      $set: { isBlocked: data.isBlocked }
    }, { new: true });

    if (!updated) {
      console.error("No user found with the specified ID.");
      return;
    }

    console.log(`User ${updated._id} block status successfully updated to ${updated.isBlocked}`);
  } catch (error) {
    console.error('Error updating user status:', error);
    throw new Error('Error updating user status');
  }
}