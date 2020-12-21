import { Schema as _Schema, model } from "mongoose";
import { Schema } from "mongoose";

const DealSchema = new _Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    idPedido: {
      type: Number,
      required: true,
    },
    volumes: [
      {
        servico: { type: String },
        codigoRastreamento: { type: String },
      },
    ],
    value: {
      type: Number,
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Deal = model("Deal", DealSchema);
export default Deal;
