import { db } from "../configs/database";
import { DataTypes, Model, Optional } from "sequelize";
import { decrypt, encrypt } from "../misc/utils";

interface UserAttributes {
    id: number
    pk: string 
    address: string // note: it's the wallet address from user's wallet not one from pk above
    name: string | null
    image: string | null
    description: string | null
    website: string | null
    twitter: string | null
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }


interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const User = db.define<UserInstance>(
    'User',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        pk: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value: string) {
                if (value) {
                    this.setDataValue("pk", encrypt(value));
                }
            },
            get() {
                const encryptedPk = this.getDataValue("pk");
                if (encryptedPk) {
                    return decrypt(encryptedPk);
                }
                return null;
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },
        twitter: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        tableName: "User"
    },
);
async function syncModel() {
    await User.sync({ alter: true });
}
syncModel()