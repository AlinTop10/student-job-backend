import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import { sequelize } from "../db";

class ClaimToken extends Model<
  InferAttributes<ClaimToken>,
  InferCreationAttributes<ClaimToken>
> {
  declare id: CreationOptional<number>;
  declare idCerere: number;
  declare token: string;
  declare expires_at: CreationOptional<Date | null>;
  declare created_at: CreationOptional<Date>;
}

ClaimToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    idCerere: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },

    token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "claim_tokens",
    timestamps: false,
  }
);

export { ClaimToken };