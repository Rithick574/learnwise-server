import { compare } from "bcrypt";

export const comparePassword = async (original: string, encrypted: string) => {
  try {
    const match = await compare(original, encrypted);

    if (!match) {
      return false;
    }

    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
