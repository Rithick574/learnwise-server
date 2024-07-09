import server from "./presentation/index"
import database from "./_boot/config"


(async()=>{
try {
    server;
    await Promise.all([database()])
    .then(() => console.log("kafka consumer is runnnig"))
    .catch((error) => {
      console.error(`Error while initializing Kafka consumer: ${error}`);
      process.exit(0);
    });

} catch (error:any) {
    console.log("Error on start up: ", error);
}finally{
    process.on("SIGINT", async () => {
        console.log("\n Server is shutting down...");
        process.exit();
      });
}
})();