import { PrismaClient } from "@prisma/client";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
  async (req, res) => {
    if (req.method == "POST") {
      await validar.tokenGoogle(req, res);
      await validar.obraExiste(req, res);
      await validar.corpo(schema.nota, req, res);
      await adicionarNota(req, res);
    } else {
      throw mensagemErroPadrao;
    }
  }
);

const adicionarNota = async (req, res) => {
  let resposta = {};
  resposta.timestamp = moment().format();
  let jaVotou = await prisma.nota.findFirst({ where: { email: req.body.email, obraId: Number(req.query.obraId) } });
  if (jaVotou) {
    resposta.status = CODIGO_STATUS.OBRA.NOTA_JA_EXISTE;
  }
  else {
    await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.nota), obraId: Number(req.query.obraId) } });
    resposta.status = CODIGO_STATUS.OBRA.NOTA_CRIADA_SUCESSO;
  }
  res.status(200).json(resposta);
};
