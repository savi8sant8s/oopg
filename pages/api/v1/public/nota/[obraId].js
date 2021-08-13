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
        await adicionarNota(req, res);
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

const adicionarNota = validar.corpo(schema.nota, async (req, res) => {
    let resposta = {};
    resposta.timestamp = moment().locale("pt-br").format();
    let jaVotou = await prisma.nota.findFirst({ where: { email: req.body.email, obraId: Number(req.query.obraId)}});
    if (jaVotou) {
        resposta.status = CODIGO_STATUS.OBRA.NOTA_JA_EXISTE;
    }
    else {
        await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.nota), obraId: Number(req.query.obraId) } });
        resposta.status = CODIGO_STATUS.OBRA.NOTA_CRIADA_SUCESSO;
    }
    res.status(200).json(resposta);
});

