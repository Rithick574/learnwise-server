import { sendVerificationMail } from "@/infrastructure/services";

export default async (
    data:string
) => {

    try {

        // if(data?.isVerified){
        //     return;
        // }

        await sendVerificationMail(data);

        console.log("==========");
        console.log("user-created-consumed mail send");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed mail send error: ", error?.message);
    }

}