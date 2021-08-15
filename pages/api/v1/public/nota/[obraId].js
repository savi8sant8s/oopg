import { PrismaClient } from "@prisma/client";
import { Validacao } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";

const prisma = new PrismaClient();

export default capturarExcecoes(
  async (req, res) => {
    let validar = new Validacao(req, res);

    validar.metodo(["POST"]);
    await validar.tokenGoogle();
    await validar.obraExiste();
    await validar.corpo(schema.nota);

    let resposta = {};
    resposta.dataHora = moment().format();

    let obraId = Number(req.query.obraId);
    let jaVotou = await prisma.nota.findFirst({ where: { email: req.body.email, obraId: obraId } });
    if (jaVotou) {
      resposta.status = CODIGO_STATUS.OBRA.NOTA_JA_EXISTE;
    }
    else {
      await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.nota), obraId: obraId } });
      resposta.status = CODIGO_STATUS.OBRA.NOTA_CRIADA_SUCESSO;
    }

    res.status(200).json(resposta);
  }
);
