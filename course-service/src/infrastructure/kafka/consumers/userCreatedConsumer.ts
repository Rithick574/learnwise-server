import { UserEntity } from "@/domain/entities";
import { createUser } from "@/infrastructure/database/mongoDB/repositories/user/createUser";

export default async (data: UserEntity) => {
  try {
    await createUser(data);
  } catch (error: any) {
    console.log("user-created-consumed error: ", error?.message);
  }
};
