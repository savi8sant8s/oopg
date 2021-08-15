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
    await validar.corpo(schema.comentario);

    let resposta = {};
    resposta.dataHora = moment().format();

    req.body.obraId = Number(req.query.obraId);
    await prisma.comentario.create({ data: req.body });
    resposta.status = CODIGO_STATUS.OBRA.COMENTARIO_CRIADO_SUCESSO;

    res.status(200).json(resposta);
  }
);
