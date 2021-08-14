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
      await validar.corpo(schema.comentario, req, res);
      await adicionarComentario(req, res);
    } else {
      throw mensagemErroPadrao;
    }
  }
);

const adicionarComentario = async (req, res) => {
  req.body.obraId = Number(req.query.obraId);
  await prisma.comentario.create({ data: req.body });
  res.status(200).json({
    timestamp: moment().format(),
    status: CODIGO_STATUS.OBRA.COMENTARIO_CRIADO_SUCESSO
  });
};
