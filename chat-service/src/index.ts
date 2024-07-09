import database from "./_boot/config";
import server from "./presentation";
import { runConsumer, stopConsumer } from "./_boot/consumer";

(async () => {
  try {
    server;
    await Promise.all([database(), runConsumer()])
      .then(() => console.log("kafka consumer is runnnig....."))
      .catch((error) => {
        console.error(`Error while initializing Kafka consumer: ${error}`);
        process.exit(0);
      });

    process.on("SIGTERM", async () => {
      console.info("SIGTERM received");
      await stopConsumer();
      process.exit(0);
    });
    
  } catch (error) {
    console.log("Error on start up: ", error as Error);
  } finally {
    process.on("SIGINT", async () => {
      console.log("\n Server is shutting down...");
      process.exit(1);
    });
  }
})();
