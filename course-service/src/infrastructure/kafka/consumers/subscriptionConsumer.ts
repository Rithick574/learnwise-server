import { User } from "@/infrastructure/database/mongoDB/models/user";


export const subscriptionConsumer = async (data: { instructorId: string; amount: number }) => {
    try {
        const instructor = await User.findOne({ email: data.instructorId });
        console.log("🚀 ~ file: subscriptionConsumer.ts:7 ~ subscriptionConsumer ~ instructor:", instructor)
        if (!instructor) {
            throw new Error("Instructor not found");
        }
        if (instructor.profit === undefined) {
            instructor.profit = 0;
        }
        instructor.profit += data.amount;
        await instructor.save();

        console.log(`Successfully updated profit for instructor ${data.instructorId}`);
    } catch (error) {
        console.error("Subscription consumer error:", (error as Error).message);
    }
};
