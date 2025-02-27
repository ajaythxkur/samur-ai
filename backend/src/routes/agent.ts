import express from "express";
import MoveAiAgentService from "../misc/move-ai-agent-service";
import { createLogger } from "../misc/utils";
import { HumanMessage } from "@langchain/core/messages";
const logger = createLogger("agent-routes")
const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const body = req.body;
        const message = body.message ?? ""
        const moveAiAgentService = new MoveAiAgentService();
        const { agent } = await moveAiAgentService.createAgent();
        const stream = await agent.stream(
            {
                messages: [new HumanMessage(message)],
            },
            
        );
        
        for await (const chunk of stream) {
            if ("agent" in chunk) {
                console.log(chunk.agent.messages[0].content);
            } else if ("tools" in chunk) {
                console.log(chunk.tools.messages[0].content);
            }
            console.log("-------------------");
        }
        res.json(
            {
                messages: "result.messages.map(moveAiAgentService.convertLangChainMessageToVercelMessage)",
            },
        )
    } catch (error) {
        logger.error(error)
        res.status(500).json(`Fatal error in agent-routes`)
    }
});

export const agentRoutes = router;