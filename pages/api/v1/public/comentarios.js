import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { CODIGO_STATUS } from "../../../../services/codigo-status";


const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET" && req.query.obraId) {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            resposta.status = CODIGO_STATUS.OBRA.COMENTARIOS_OBRA_SUCESSO;
            resposta.comentarios = await prisma.comentario.findMany({ where: { obraId: Number(req.query.obraId) } });
            resposta.quantComentarios = await prisma.comentario.count({ where: { obraId: Number(req.query.obraId) } });
            res.status(200).json(resposta);
        } catch (erro) {
            res.status(400).end(erro);;
        }
    } else {
        res.status(400).end("Recurso não encontrado.");
    }
};
