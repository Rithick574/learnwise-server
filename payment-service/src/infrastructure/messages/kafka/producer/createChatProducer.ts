import { producer } from "..";

export default async (data: { type: string; participants: string[] }) => {
  try {
    await producer.connect();
    const message = {
      topic: "chat-service-topic",
      messages: [
        {
          key: "createChat",
          value: JSON.stringify(data),
        },
      ],
    };
    await producer.send(message);
    console.log("🚀 ~ file: createChatProducer.ts:28 ~ message:", message)
  } catch (error) {
    console.error("Kafka produce error:", (error as Error).message);
  } finally {
    try {
      await producer.disconnect();
    } catch (disconnectError) {
      console.error(
        "Kafka disconnect error:",
        (disconnectError as Error).message
      );
    }
  }
};
