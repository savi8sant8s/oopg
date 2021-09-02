import { Validacao } from "../../../../../services/validacao";
import { STATUS } from "../../../../../services/codigo-status";
import { schema } from "../../../../../services/schemas";
import moment from "moment";
import { capturarExcecoes } from "../../../../../middlewares/capturar-excecoes";
import { PrismaSingleton } from "../../../../../services/prisma-singleton";

const prisma = PrismaSingleton.pegarInstancia();

export default capturarExcecoes(
  async (req, res) => {
    let validar = new Validacao(req, res);

    validar.metodo(["PUT"]);
    await validar.token("CLIENTE_GOOGLE");
    await validar.obra();
    await validar.corpo(schema.nota);

    let resposta = {};
    resposta.dataHora = moment().format();

    let obraId = Number(req.query.obraId);
    let votoExistente = await prisma.nota.findFirst({ where: { email: req.body.email, obraId: obraId } });
    if (votoExistente) {
      await prisma.nota.update({ data: { nota: Number(req.body.nota) }, where: { id: votoExistente.id } });
      resposta.status = STATUS.NOTA.ATUALIZADA_SUCESSO;
    }
    else {
      await prisma.nota.create({ data: { email: req.body.email, nota: Number(req.body.nota), obraId: obraId } });
      resposta.status = STATUS.NOTA.CRIADA_SUCESSO;
    }

    res.status(201).json(resposta);
  }
);
