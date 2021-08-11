import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { CODIGO_STATUS } from "../../../../services/codigo-status";
import { respostaPadrao } from "../../../../middlewares/respostas-padrao";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET") {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            resposta.status = CODIGO_STATUS.OBRA.OBRAS_SUCESSO;
            resposta.obras = await prisma.obra.findMany({ select: { id: true, numeroLicitacao: true, descricao: true, categoria: true, contratoDataInicio: true } });
            resposta.quantObras = await prisma.obra.count();
            res.status(200).json(resposta);
        } catch (erro) {
            respostaPadrao.erroInesperado(res, erro);
        }
    } else {
        respostaPadrao.recursoNaoDisponivel(res);
    }
};

