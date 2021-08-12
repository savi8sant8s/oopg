import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { CODIGO_STATUS } from "../../../../services/codigo-status";


const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method == "GET" && req.query.obraId) {
        try {
            let resposta = {};
            resposta.timestamp = moment().locale("pt-br").format();
            resposta.status = CODIGO_STATUS.OBRA.NOTAS_OBRA_SUCESSO;
            resposta.gostou = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 1 } });
            resposta.indiferente = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 2 } });
            resposta.naogostou = await prisma.nota.count({ where: { obraId: Number(req.query.obraId), nota: 3 } });
            res.status(200).json(resposta);
        } catch (erro) {
            res.status(400).end(erro);;
        }
    } else {
        res.status(400).end("Recurso não encontrado.");
    }
};
