import OpenAI from "openai";
import { createLogger } from "../utils";
const logger = createLogger("openai")
class OpenAi {
    openai: OpenAI;
    model = "gpt-4o-mini";
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI_SECRET,
        });
    }

    async generateImage(prompt: string) {
        const prefix =
            "A futuristic blockchain-inspired illustration featuring a tech-savvy character in a high-energy, cyber-financial world. The design should incorporate elements of crypto trading, memecoins, and decentralized networks, with neon-lit aesthetics, digital assets, and a sleek, modern vibe. The character should have a dynamic presence, reflecting the fast-paced nature of Web3, with accessories like holographic screens, crypto wallets, or trading terminals. The background should include elements symbolizing Aptos, smart contracts, and digital economies.";
        const fullPrompt = `${prefix}\n${prompt}`;
        try {
            const response = await this.openai.images.generate({
                model: "dall-e-2",
                prompt: fullPrompt,
                n: 1,
                size: "512x512",
                quality: "standard",
            });
            return response.data[0].url;
        } catch (error) {
            logger.error("Image generation error:", error);
            throw error;
        }
    }
}

export const openai = new OpenAi();
