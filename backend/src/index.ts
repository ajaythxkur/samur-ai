import "dotenv/config";
import express from "express";
import cors from "cors"
import helmet from "helmet";
import http from "http";
import { createLogger } from "./misc/utils";
import { agentRoutes } from "./routes/agent";
import { userRoutes } from "./routes/user";

const logger = createLogger("index")
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (_req: express.Request, res: express.Response) => {
    res.json({ message: "move-ai-agent" });
})

// ROUTES START
app.use("/api/user", userRoutes);
app.use("/api/agent", agentRoutes);
// ROUTES END

app.use("*", (_req: express.Request, res: express.Response) => {
    res.status(404).json({ message: "not-found" });
})

const server = http.createServer(app);
const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => {
    logger.info(`server started at port: ${PORT}`)
})