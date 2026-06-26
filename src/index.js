import express from "express";
import { config } from "./config/config.js";

const API_VERSION = config.api_version;
const PORT = config.port;

const app = express();

app.use(express.json());

app.listen(PORT, () => { console.log(`SERVER RUNING ON PORT http://localhost:${PORT}${API_VERSION}`) });