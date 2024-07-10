import { Certificate } from "../../models/certificate";

export const getCertificates=async(userId:string):Promise<any | null>=>{
    try {
        const certificates = Certificate.find({userId})
        return certificates;
    } catch (error) {
        throw new Error((error as Error)?.message);
    }
}