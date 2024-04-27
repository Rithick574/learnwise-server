

export interface IVerifyOtpUseCase {
    execute(email: string, otp: string): Promise<Boolean | null>;
}