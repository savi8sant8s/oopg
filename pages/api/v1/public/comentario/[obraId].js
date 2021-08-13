import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { validar } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        await adicionarComentario(req, res);
        break;
      default:
        throw "Recurso não encontrado.";
    }
  } catch (erro) {
    res.status(400).json({
      timestamp: moment().format(),
      status: CODIGO_STATUS.ERRO.PROBLEMA_INESPERADO,
      erro: erro
    });
  }
}

const adicionarComentario = validar.corpo(schema.comentario, async (req, res) => {
  let corpo = req.body;
  corpo.obraId = Number(req.query.obraId);
  await prisma.comentario.create({ data: corpo });
  res.status(200).json({
    timestamp: moment().format(),
    status: CODIGO_STATUS.OBRA.COMENTARIO_CRIADO_SUCESSO
  });
});


