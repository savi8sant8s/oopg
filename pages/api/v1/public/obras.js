import { PrismaClient } from "@prisma/client";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import moment from "moment";
import { capturarExcecoes, mensagemErroPadrao } from "../../../../middlewares/validacao";

const prisma = new PrismaClient();

export default capturarExcecoes(
    async (req, res) => {
        if (req.method == "GET") {
            await listarObras(req, res);
        } else {
            throw mensagemErroPadrao;
        }
    }
);

const listarObras = async (_req, res) => {
    let resposta = {};
    resposta.obras = await prisma.obra.findMany({ select: { id: true, numeroLicitacao: true, descricao: true, categoria: true, contratoDataInicio: true } });
    resposta.quantObras = await prisma.obra.count();
    resposta.timestamp = moment().format();
    resposta.status = CODIGO_STATUS.OBRA.OBRAS_SUCESSO;
    res.status(200).json(resposta);
};