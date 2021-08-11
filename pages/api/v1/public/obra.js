import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { respostaPadrao } from "../../../../middlewares/respostas-padrao";
import { CODIGO_STATUS } from "../../../../services/codigo-status";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET" && req.query.id) {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            resposta.status = CODIGO_STATUS.OBRA.OBRA_SUCESSO;
            resposta.obra = await prisma.obra.findUnique({ where: { id: Number(req.query.id) } });
            res.status(200).json(resposta);
        } catch (erro) {
            respostaPadrao.erroInesperado(res, erro);
        }
    } else {
        respostaPadrao.recursoNaoDisponivel(res);
    }
};
