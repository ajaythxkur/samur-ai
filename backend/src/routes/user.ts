import express from "express";
import { createLogger } from "../misc/utils";
import validationMiddleware from "../middleware/validation-middleware";
import { createUserSchema } from "../misc/validation";
import { createAccount, deriveAccountFromPk, validateSignature } from "../misc/aptos-sdk";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth-middleware";

const logger = createLogger("user-routes")
const router = express.Router();

router.post("/login", validationMiddleware(createUserSchema), async (req: express.Request, res: express.Response) => {
    try {
        const { signature, publicKey, address, message } = req.body;
        const validate = validateSignature(
            publicKey,
            message,
            signature
        );
        if(!validate) {
            throw new Error(`Invalid signature. Status: ${validate}`)
        }
        let user = await User.findOne({ where: { address } });
        if(!user) {
            const aptosAccount = createAccount();
            user = await User.create({
                pk: aptosAccount.privateKey.toString(),
                address
            })
        };
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.json({ data: token });

    } catch (error: any) {
        logger.error(error)
        res.status(500).json(`Fatal error: ${error.message}`)
    }
});

router.get("/get/:address", async(req: express.Request, res: express.Response) => {
    try {
        const user = await User.findOne({ where:{ address: req.params.address }});
        if(!user) throw new Error(`User account not found by address`);
        // FORMAT DATA AND DON'T SEND PK
        const aptosAccount = deriveAccountFromPk(user.pk);
        const data = {
            id: user.id,
            address: user.address,
            smart_address: aptosAccount.accountAddress.toString(),
            name: user.name,
            image: user.image,
            description: user.description,
            website: user.website,
            twitter: user.twitter,
        }
        res.json({ data });
    } catch (error: any) {
        logger.error(error)
        res.status(500).json(`Fatal error: ${error.message}`)
    }
})

export const userRoutes = router;