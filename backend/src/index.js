import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import connectToDb from "./configs/mongoose.config.js"
import http from "http"
import dns from "dns"
import mongoose from "mongoose"

dns.setServers([`1.1.1.1`,`8.8.8.8`])


await connectToDb()
    console.log(`Database connection successful`)
const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server is running on port: ${port} ✅`)
})

const shutDown = async () => {
    console.log(`Closing the server`)
    console.log(`Disconnecting database services`)
    server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
});
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown)
process.on("uncaughtException", async (error) => {
        console.error(error)
        process.exit(1)
})
process.on("unhandledRejection", async (error) => {
    console.error(error)
    process.exit(1)
})