import { Aptos, AptosConfig, Ed25519PrivateKey, HexInput, NetworkToNetworkName, PrivateKey, PrivateKeyVariants } from "@aptos-labs/ts-sdk";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, BaseMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { AgentRuntime, createAptosTools, LocalSigner } from "move-agent-kit";
import { Message as VercelChatMessage } from "ai"

export default class MoveAiAgentService {
    llm: ChatAnthropic = new ChatAnthropic({
        temperature: 0.7,
        model: "claude-3-5-sonnet-latest",
        apiKey: process.env.ANTHROPIC_API_KEY,
    })
    memory = new MemorySaver()

    async createAgent(){
        const network = NetworkToNetworkName[process.env.NETWORK ?? "devnet"];
        const aptosConfig = new AptosConfig({ network });
        const aptos = new Aptos(aptosConfig);
        const account = await aptos.deriveAccountFromPrivateKey({
            privateKey: new Ed25519PrivateKey(
                PrivateKey.formatPrivateKey(process.env.APTOS_PRIVATE_KEY as HexInput, PrivateKeyVariants.Ed25519)
            ),
        })
        const signer = new LocalSigner(account, network)
        const agentRuntime = new AgentRuntime(signer, aptos);
        const tools = createAptosTools(agentRuntime);
        const agent = createReactAgent({
			llm: this.llm,
			tools,
			checkpointSaver: this.memory,
			messageModifier: `
                You are a helpful agent that can interact onchain using the Aptos Agent Kit. You are
                empowered to interact onchain using your tools. If you ever need funds, you can request them from the
                faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
                (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
                can't do with your currently available tools, you must say so, and encourage them to implement it
                themselves using the Aptos Agent Kit, recommend they go to https://www.aptosagentkit.xyz for more information. Be
                concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.

                The response also contains token/token[] which contains the name and address of the token and the decimals.
                WHEN YOU RETURN ANY TOKEN AMOUNTS, RETURN THEM ACCORDING TO THE DECIMALS OF THE TOKEN.
            `,
		});
        
        return {
            agent
        }
    }

    convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
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

    convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
        if (message.role === "user") {
            return new HumanMessage(message.content)
        } else if (message.role === "assistant") {
            return new AIMessage(message.content)
        } else {
            return new ChatMessage(message.content, message.role)
        }
    }
}