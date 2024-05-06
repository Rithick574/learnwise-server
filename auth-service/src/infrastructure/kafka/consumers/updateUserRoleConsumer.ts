import { User } from "@/infrastructure/database/mongodb/models";

export async function updateUserRoleConsumer(data: {
  email: string;
  newRole: string;
}): Promise<void> {
  console.log(`Updating user role for ${data.email} to ${data.newRole}`);
  await User.updateOne({ email: data.email }, { $set: { role: data.newRole } });
}
