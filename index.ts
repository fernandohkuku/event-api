import Server from "./src/app";

const server = Server.init(3700);
import dotenv  from 'dotenv';
dotenv.config();

server.start(()=>console.log("servidor corriendo en 3700"))