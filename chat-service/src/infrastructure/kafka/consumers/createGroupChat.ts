import { createChat } from "@/infrastructure/database/mongoDB/repositories"


export default async(
    data:any
)=>{
    try {
        await createChat(data)
    } catch (error) {
        
    }
}