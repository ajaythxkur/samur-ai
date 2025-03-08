import { db } from "../configs/database";
import { DataTypes, Model, Optional } from "sequelize";
import { User } from "./User";
import { encrypt, decrypt } from "../misc/utils";

interface AgentAttributes {
    id: number
    user_id: number 
    name: string 
    image: string 
    description: string
    website: string | null 
    twitter: string | null 
    telegram: string | null
    x_username: string | null 
    x_password: string | null
}

interface AgentCreationAttributes extends Optional<AgentAttributes, "id"> { }

interface AgentInstance
    extends Model<AgentAttributes, AgentCreationAttributes>,
    AgentAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Agent = db.define<AgentInstance>(
    'Agent',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, 
                key: "id",   
            },
            onDelete: "CASCADE", 
            onUpdate: "CASCADE",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
        },
        twitter: {
            type: DataTypes.STRING,
        },
        telegram: {
            type: DataTypes.STRING,
        },
        x_username: {
            type: DataTypes.STRING
        },
        x_password: {
            type: DataTypes.STRING,
            set(value: string) {
                if (value) {
                    this.setDataValue("x_password", encrypt(value));
                }
            },
            get() {
                const encryptedPw = this.getDataValue("x_password");
                if (encryptedPw) {
                    return decrypt(encryptedPw);
                }
                return null;
            },
        }
    },
    {
        timestamps: true,
        tableName: "Agent"
    },
);
async function syncModel() {
    await Agent.sync();
}
syncModel()