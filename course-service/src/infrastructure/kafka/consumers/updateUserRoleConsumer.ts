import { User } from "@/infrastructure/database/mongoDB/models/user"; 

export async function updateUserRoleConsumer(data: {
  email: string;
  newRole: string;
  github?: string;
  linkedIn?: string;
}): Promise<void> {
  console.log(`Updating user role for ${data.email} to ${data.newRole}`);
  const updateObject: any = {
    role: data.newRole,
    ...(data.github && { 'contact.socialMedia.github': data.github }),
    ...(data.linkedIn && { 'contact.socialMedia.linkedIn': data.linkedIn }),
  };

  await User.updateOne({ email: data.email }, { $set: updateObject });
}