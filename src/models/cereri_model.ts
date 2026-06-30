import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import { sequelize } from "../db";

class Cerere extends Model<InferAttributes<Cerere>, InferCreationAttributes<Cerere>> {
  declare idCerere: CreationOptional<number>;
  declare idUser: number;
  declare detalii: string;
  declare locatie: string;
  declare nr_persoane: number;
  declare ora: Date;
  declare plata: number;
  declare moneda: CreationOptional<string>;
  declare preferinta_gender: CreationOptional<"ORICARE" | "DOAR_FETE" | "DOAR_BAIETI">;
  declare statusCerere: CreationOptional<"OPEN" | "RESERVED" | "AWAITING_PAYMENT" | "PAID" | "CANCELLED" | "DONE" | "PENDING_APPROVAL">;
  declare created_at: CreationOptional<Date>;
}

Cerere.init(
  {
    idCerere: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    idUser: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    detalii: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    locatie: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    nr_persoane: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    ora: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    plata: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    moneda: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "RON",
    },

    preferinta_gender: {
      type: DataTypes.ENUM("ORICARE", "DOAR_FETE", "DOAR_BAIETI"),
      allowNull: false,
      defaultValue: "ORICARE",
    },

    statusCerere: {
      type: DataTypes.ENUM(
        "OPEN",
        "RESERVED",
        "AWAITING_PAYMENT",
        "PAID",
        "CANCELLED",
        "DONE",
        "PENDING_APPROVAL"
      ),
      allowNull: false,
      defaultValue: "OPEN",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "cereri",
    timestamps: false,
  }
);

export { Cerere };