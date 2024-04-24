import server from "@/presentation/index"
import database from "@/_boot/config"

(async()=>{
try {
    server;
    await database();
} catch (error:any) {
    console.log("Error on start up: ", error);
}finally{
    process.on("SIGINT", async () => {
        console.log("\n Server is shutting down...");
        process.exit();
      });
}
})();