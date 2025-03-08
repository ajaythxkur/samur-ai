import express from "express";
import { createLogger } from "../misc/utils";
import authMiddleware from "../middleware/auth-middleware";
import validationMiddleware from "../middleware/validation-middleware";
import { chatSchema, createAgentSchema } from "../misc/validation";
import { Agent } from "../models/Agent";
import { FindOptions } from "sequelize";
import { User } from "../models/User";
import MoveAi from "../misc/llm/moveai";
import { AIMessage, BaseMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import { Message as VercelChatMessage } from "ai"
const logger = createLogger("agent-routes")
const router = express.Router();

router.post("/create", authMiddleware, validationMiddleware(createAgentSchema), async (req: express.Request, res: express.Response) => {
    try {
        const user = req.user;
        const body = req.body;
        const exists = await Agent.findOne({ where: {
            name: body.name
        }});
        if(exists) throw new Error(`Agent with same name already exists.`)
        const agent = await Agent.create({
            user_id: user.id,
            name: body.name,
            image: body.image,
            description: body.description,
            telegram: body.telegram ?? null,
            twitter: body.twitter ?? null,
            x_username: body.x_username ?? null,
            x_password: body.x_password ?? null,
        })
        res.json({
            data: agent.toJSON()
        })
    } catch (error: any) {
        logger.error(error)
        res.status(500).json(`${error.message}`)
    }
});

// const agentPublicAttributes = ["id", "user_id", "name", "image", "description", "telegram", "twitter", "website"]
router.get("/get", async (req: express.Request, res: express.Response) => {
    try {
        const offset = req.query.offset ? parseInt(req.query.offset.toString()) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder ?? "asc";
        const options: FindOptions = {
            where: {

            },
        }
        // options.attributes = agentPublicAttributes;
        options.offset = offset;
        options.limit = limit;
        if(sortBy) {
            options.order = [[sortBy.toString(), sortOrder.toString()]]
        }
        const data = await Agent.findAll(options);
        const totalCount = await Agent.count(options);
        res.json({
            data,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentOffset: offset
            }
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json(`Fatal error in agent-routes`)
    }
})

router.get("/get/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const data = await Agent.findByPk(id);
        res.json({
            data
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json(`Fatal error in agent-routes`)
    }
})

const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
	if (message._getType() === "human") {
		return { content: message.content, role: "user" }
	} else if (message._getType() === "ai") {
		return {
			content: message.content,
			role: "assistant",
			tool_calls: (message as AIMessage).tool_calls,
		}
	} else {
		return { content: message.content, role: message._getType() }
	}
}

const textDecoder = new TextDecoder()

// Function to read and process the stream
async function readStream(stream: any) {
	try {
		// Create a reader from the stream
		const reader = stream.getReader()

		let result = ""

		while (true) {
			// Read each chunk from the stream
			const { done, value } = await reader.read()

			// If the stream is finished, break the loop
			if (done) {
				break
			}

			// Decode the chunk and append to result
			result += textDecoder.decode(value, { stream: true })
		}

		// Final decode to handle any remaining bytes
		result += textDecoder.decode()

		return result
	} catch (error) {
		console.error("Error reading stream:", error)
		throw error
	}
}

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
	if (message.role === "user") {
		return new HumanMessage(message.content)
	} else if (message.role === "assistant") {
		return new AIMessage(message.content)
	} else {
		return new ChatMessage(message.content, message.role)
	}
}
router.post("/chat/:id", validationMiddleware(chatSchema), async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const exists = await Agent.findByPk(id);
        if(!exists) throw new Error("Agent does not exists.");
        const user = await User.findByPk(exists.user_id);
        if(!user) throw new Error("User does not exist.")
        const moveai = new MoveAi(user.pk);
        const agent = await moveai.createReactAgent();
        if(!agent) throw new Error("Agent not found")
        // Parse request body
		const messages = req.body.messages ?? []
		const showIntermediateSteps = req.body.show_intermediate_steps ?? false

		if (!showIntermediateSteps) {

			const eventStream = await agent.streamEvents(
				{ messages },
				{
					version: "v2",
					configurable: {
						thread_id: "Aptos Agent Kit!",
					},
				}
			)

			const textEncoder = new TextEncoder()
			const transformStream = new ReadableStream({
				async start(controller) {
					for await (const { event, data } of eventStream) {
						if (event === "on_chat_model_stream") {
							if (data.chunk.content) {
								if (typeof data.chunk.content === "string") {
									controller.enqueue(textEncoder.encode(data.chunk.content))
								} else {
									for (const content of data.chunk.content) {
										controller.enqueue(textEncoder.encode(content.text ? content.text : ""))
									}
								}
							}
						}
					}
					controller.close()
				},
			})

            console.log("transformStream", transformStream)

            const decodedContent = await readStream(transformStream);
            console.log('Decoded content:', decodedContent);
			res.json({
                data: decodedContent
            })
		} else {
			/**
			 * We could also pick intermediate steps out from `streamEvents` chunks, but
			 * they are generated as JSON objects, so streaming and displaying them with
			 * the AI SDK is more complicated.
			 */
			const result = await agent.invoke({ messages })

			console.log("result", result)

			res.json(
				{
					messages: result.messages.map(convertLangChainMessageToVercelMessage),
				},
			)
		}
       
    } catch (error) {
        logger.error(error)
        res.status(500).json(`Fatal error in agent-routes`)
    }
} )

export const agentRoutes = router;