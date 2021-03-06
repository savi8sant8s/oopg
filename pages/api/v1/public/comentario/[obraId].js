import { Validacao } from "../../../../../services/validacao";
import { STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";
import prisma from "../../../../../services/prisma-db";

export default capturarExcecoes(
  async (req, res) => {
    let validar = new Validacao(req, res);

    validar.metodo(["POST"]);
    await validar.token("CLIENTE_GOOGLE");
    await validar.obra();
    await validar.corpo(schema.comentario);

    let resposta = {};
    resposta.dataHora = moment().format();

    req.body.obraId = Number(req.query.obraId);
    await prisma.comentario.create({ data: req.body });
    resposta.status = STATUS.COMENTARIO.CRIADO_SUCESSO;

    res.status(201).json(resposta);
  }
);
