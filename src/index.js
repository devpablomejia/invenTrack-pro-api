import express from "express";
import { config } from "./infra/config/config.js";
import authRoutes from "./routes/authRoutes.js";

const API_VERSION = config.api_version;
const PORT = config.port;
const app = express();

app.use(express.json());
app.use(API_VERSION, authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" });
});
app.listen(PORT, () => { console.log(`SERVER RUNING ON PORT http://localhost:${PORT}${API_VERSION}`) });