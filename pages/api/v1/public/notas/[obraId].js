import { PrismaClient } from "@prisma/client";
import { capturarExcecoes, mensagemErroPadrao, validar } from "../../../../../middlewares/validacao";
import { CODIGO_STATUS } from "../../../../../services/codigo-status";
import moment from "moment";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "GET") {
            await validar.obraExiste(req, res);
            await listaNotas(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const listaNotas = async (req, res) => {
    let resposta = {};
    resposta.gostou = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 1 } });
    resposta.indiferente = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 2 } });
    resposta.naogostou = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 3 } });
    resposta.status = CODIGO_STATUS.OBRA.NOTAS_OBRA_SUCESSO;
    resposta.timestamp = moment().format();
    res.status(200).json(resposta);
};
