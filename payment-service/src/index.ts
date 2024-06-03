import server from "@/presentation/index"
import database from "@/_boot/config"
// import {runConsumer,stopConsumer} from "@/_boot/consumer"

(async()=>{
try {
    server;
    // await Promise.all([database(), runConsumer()])
    await Promise.all([database()])
    .then(() => console.log("kafka consumer is runnnig"))
    .catch((error) => {
      console.error(`Error while initializing Kafka consumer: ${error}`);
      process.exit(0);
    });

    // process.on('SIGTERM', async () => {
    //     console.info("SIGTERM received")
    //     stopConsumer();
    // })

} catch (error:any) {
    console.log("Error on start up: ", error);
}finally{
    process.on("SIGINT", async () => {
        console.log("\n Server is shutting down...");
        process.exit();
      });
}
})();