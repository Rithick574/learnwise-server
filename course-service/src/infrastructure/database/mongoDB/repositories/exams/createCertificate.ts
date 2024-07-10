import { Certificate } from "../../models/certificate";
import { ICertificate } from "../../../../../domain/entities";

export const createCertificate = async (
  userId: string,
  courseName: string,
  url: string
): Promise<ICertificate | null> => {
  try {
    const certificate = new Certificate({
      userId,
      courseName,
      url,
      date: new Date(),
    });
    await certificate.save();
    return certificate;
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};
