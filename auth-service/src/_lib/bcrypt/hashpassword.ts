import { genSalt, hash } from "bcrypt";

export const hashPassword = async (password:string)=>{
try {
    const salt = await genSalt(10)
    const hashedPassword= await hash(password,salt)
    if (!hashedPassword) {
        throw new Error("Password hashing error!");
    }
    return hashedPassword;
} catch (error:any) {
    throw new Error(error?.message);
}
}