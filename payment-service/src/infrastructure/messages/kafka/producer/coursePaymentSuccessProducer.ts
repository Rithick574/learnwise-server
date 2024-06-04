import { producer } from "..";

export default async (data: {
  userId: string;
  courseId: string;
  amount: number;
}) => {
  try {
    const { userId, courseId, amount } = data;

    await producer.connect();

    const message =
      {
        topic: "course-service-topic",
        messages: [
          {
            key: "coursePaymentSuccess",
            value: JSON.stringify({
              userId: userId,
              courseId: courseId,
              amount: amount,
            }),
          },
        ],
      };
    
    await producer.send(message);
  } catch (error) {
    console.error("Kafka produce error:", (error as Error).message);
  } finally {
    try {
        await producer.disconnect();
      } catch (disconnectError) {
        console.error("Kafka disconnect error:", (disconnectError as Error).message);
      }
  }
};
